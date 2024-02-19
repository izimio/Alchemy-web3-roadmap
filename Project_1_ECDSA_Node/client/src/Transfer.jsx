import { useState } from "react";
import server from "./server";
import { useWallet } from "./provider/WalletProvider";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import toast from "react-hot-toast";

function hashMessage(message) {
  const bytes = utf8ToBytes(message);
  const hash = keccak256(bytes);

  return hash;
}

async function signMessage(msg, PRIVATE_KEY) {
  const hash = hashMessage(msg);
  console.log("hash", hash);
  const signature =  secp256k1.sign(hash, PRIVATE_KEY);
  return signature;
}

function Transfer() {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const setValue = (setter) => (evt) => setter(evt.target.value);
  const { balance, setBalance, privateKey, publicKey, address } = useWallet();

  async function transfer(evt) {
    if (balance < sendAmount) {
      return;
    }
    const sendObj = {
      sender: {
        publicKey,
        address,
      },
      amount: parseInt(sendAmount),
      recipient,
    };
    let signature = await signMessage(JSON.stringify(sendObj), privateKey);
    signature.r = signature.r.toString();
    signature.s = signature.s.toString();
    try {
      const {
        data
      } = await server.post("/send", { ...sendObj, hash: signature });
      setBalance(data.balance);
      toast.success("Transaction sent");
    } catch (ex) {
      console.error(ex);
      toast.error("Transaction failed");
    }
  }

  return (
    <form className="container transfer">
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
          error={balance < sendAmount}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input className="button" style={{
        transition: "all 0.3s",
        backgroundColor: balance < sendAmount ? "gray" : "",  
        color: "white",
      }} value="Transfer" onClick={transfer} disabled={balance < sendAmount}/>
    </form>
  );
}

export default Transfer;
