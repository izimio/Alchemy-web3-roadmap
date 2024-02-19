import server from "./server";
import { useWallet } from "./provider/WalletProvider";
import { useEffect, useState } from "react";

export default function WalletWatcher() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const isValidEthereum = (address) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };

  useEffect(() => {
    async function getBalance() {
      if (isValidEthereum(address)) {
        const {
          data: { balance },
        } = await server.get(`balance/${address}`);
        setBalance(balance);
        setError("");
      } else {
        if (address.length > 41) {
          setError("Invalid Ethereum address");
        }
        setBalance(0);
      }
    }
    getBalance();
  }, [address]);

  return (
    <div className="container wallet">
      <h1>Wallet Watcher</h1>
      <input
        type="text"
        value={address}
        placeholder="0x...."
        onChange={(e) => setAddress(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}
