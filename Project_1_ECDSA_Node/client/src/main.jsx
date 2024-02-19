import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { WalletProvider } from "./provider/WalletProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <WalletProvider>
        <App />
      </WalletProvider>
  </React.StrictMode>
);
