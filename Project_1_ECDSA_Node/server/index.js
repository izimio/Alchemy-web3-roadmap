const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

function hashMessage(message) {
  const bytes = utf8ToBytes(message);
  const hash = keccak256(bytes);

  return hash;
}

app.use(cors());
app.use(express.json());

const balances = {
  "0x0000000000000000000000000000000000000001": 100,
  "0x0000000000000000000000000000000000000002": 50,
  "0x0000000000000000000000000000000000000003": 75,
};

let tx_id = 0;

// Get the next tx id
app.get("/block", (req, res) => {
  res.send({ tx_id: tx_id + 1 });
});

app.post("/faucet", (req, res) => {
  const { address } = req.body;

  balances[address] += 10;
  res.send({ balance: balances[address] });
});

app.post("/wallet", (req, res) => {
  const { address } = req.body;

  if (!balances[address]) {
    balances[address] = 50;
  }
  res.status(200).send({ balance: balances[address] });
});

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, hash, index } = req.body;

  const sendObj = {
    sender,
    amount,
    recipient,
    index,
  };

  // check if the signature comes from the sender
  const hashMsg = hashMessage(JSON.stringify(sendObj));
  const signature = {
    r: BigInt(hash.r),
    s: BigInt(hash.s),
  };

  const isSigValid = secp256k1.verify(signature, hashMsg, sender.publicKey);

  // If index is not the next one, return 400 to prevent replay attacks
  if (index !== tx_id + 1) {
    return res.status(400).send({ message: "Invalid index" });
  }

  // If sender does not exist, return 400
  if (balances.hasOwnProperty(sender.address) === false) {
    return res.status(400).send({ message: "Invalid sender or recipient" });
  }

  // If signature is invalid, return 400
  if (!isSigValid) {
    return res.status(400).send({ message: "Invalid signature" });
  }

  // If sender does not have enough funds, return 403
  if (balances[sender.address] < amount) {
    return res.status(403).send({ message: "Not enough funds!" });
  }
  
  setInitialBalance(recipient);

  balances[sender.address] -= amount;
  balances[recipient] += amount;
  res.send({ balance: balances[sender.address] });
  tx_id++;
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
