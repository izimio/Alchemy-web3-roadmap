const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const {secp256k1} = require('ethereum-cryptography/secp256k1');
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

function hashMessage(message) {
    const bytes = utf8ToBytes(message);
    const hash = keccak256(bytes);

    return hash
}

app.use(cors());
app.use(express.json());

const balances = {
  "0x0000000000000000000000000000000000000001": 100,
  "0x0000000000000000000000000000000000000002": 50,
  "0x0000000000000000000000000000000000000003": 75,
};

app.post("/faucet", (req, res) => {
  const { address } = req.body;

  balances[address] += 10;
  res.send({ balance: balances[address] });
});

app.post("/wallet", (req, res) => {
  const { address } = req.body;

  if (!balances[address]) {
    balances[address] = 0;
  }
    res.status(200).send({ balance: balances[address] });
});

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, hash } = req.body;

  const sendObj = {
    sender,
    amount,
    recipient,
  };

  // check if the signature comes from the sender
  const hashMsg = hashMessage(JSON.stringify(sendObj));
  const signature = {
    r: BigInt(hash.r),
    s: BigInt(hash.s)
  };

  const isSigValid = secp256k1.verify(signature, hashMsg, sender.publicKey);

  if(balances.hasOwnProperty(sender.address) === false) {
    return res.status(400).send({ message: "Invalid sender or recipient" });
  }

  if (!isSigValid) {
    return res.status(400).send({ message: "Invalid signature" });
  }



  setInitialBalance(recipient);

  if (balances[sender.address] < amount) {
    return res.status(403).send({ message: "Not enough funds!" });
  } else {
    balances[sender.address] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender.address] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
