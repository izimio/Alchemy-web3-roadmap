import React, { useEffect, useState } from "react";

import Wallet from "./Wallet";
import WalletWatcher from "./WalletWatcher";
import Transfer from "./Transfer";
import "./App.scss";

import { useWallet } from "./provider/WalletProvider";
import ConnectModal from "./ConnectModal";
import Faucet from "./Faucet";
function App() {
  const { isLogged } = useWallet();

  if (!isLogged()) {
    return <ConnectModal />;
  }
  return (
    <div className="app">
      <Wallet/>
      <Transfer />
      <Faucet />
      <WalletWatcher />
    </div>
  );
}

export default App;
