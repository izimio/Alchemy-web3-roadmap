import server from "./server";
import { useWallet } from "./provider/WalletProvider";
import { useEffect, useState } from "react";

function Wallet() {
  const { address, setLogged } = useWallet();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async function getBalance() {
      if (address) {
        const {
          data: { balance },
        } = await server.get(`balance/${address}`);
        setBalance(balance);
      } else {
        setBalance(0);
      }
    }
    getBalance();
  }, [address]);

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <div className="address">
        <code>{address}</code>
      </div>

      <div className="balance">Balance: {balance}</div>
      <button
        style={{ padding: "10px", fontSize: "20px", margin: "10px" }}
        onClick={() => {
          localStorage.removeItem("privateKey");
          setLogged(false);
        }}
      >
        Disconnect
      </button>
    </div>
  );
}

export default Wallet;
