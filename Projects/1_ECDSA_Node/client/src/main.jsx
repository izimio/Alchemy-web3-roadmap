import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { WalletProvider } from "./provider/WalletProvider";
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <WalletProvider>
        <Toaster />
        <App />
      </WalletProvider>
  </React.StrictMode>
);
