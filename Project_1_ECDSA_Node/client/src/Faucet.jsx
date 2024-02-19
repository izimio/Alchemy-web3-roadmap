import server from "./server";
import { useWallet } from "./provider/WalletProvider";
import { useEffect, useState } from "react";

function Faucet() {
  const { address, setLogged, isLogged, setBalance } = useWallet();

  const getFaucet = async () => {
    const { data } = await server.post("/faucet", {
      address: address,
    });
    setBalance(data.balance);
  };

  return (
    <div className="container wallet">
      <h1>Get Faucet</h1>

      <div className="button" onClick={getFaucet}>
        Get Faucet
      </div>
    </div>
  );
}

export default Faucet;
