import { useState } from "react";
import { useWallet } from "./provider/WalletProvider";

function ConnectModal() {
  const { generateWallet, recoverFromPrivateKey } = useWallet();
  const [privateKey, setPrivateKey] = useState("");
  const [error, setError] = useState("");
  return (
    <div className="container wallet">
      <h1
        style={{
          textAlign: "center",
          fontSize: "50px",
        }}
      >
        {" "}
        Connect your wallet{" "}
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <button
          style={{
            padding: "10px",
            fontSize: "20px",
            margin: "10px",
          }}
          onClick={() => {
            generateWallet();
          }}
        >
          Generate new wallet
        </button>
      </div>
      <h2
        style={{
          textAlign: "center",
          fontSize: "30px",
        }}
      >
        {" "}
        or{" "}
      </h2>
      <h2
        style={{
          textAlign: "center",
          fontSize: "30px",
        }}
      >
        {" "}
        Recover your wallet{" "}
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <input
          style={{
            padding: "10px",
            fontSize: "20px",
            margin: "10px",
          }}
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          placeholder="Enter your private key"
        />
        <button
          style={{
            padding: "10px",
            fontSize: "20px",
            margin: "10px",
          }}
          onClick={() => {
            setError(recoverFromPrivateKey(privateKey))
          }}
        >
          Recover wallet
        </button>
        {error && (
          <div
            style={{
              color: "red",
              fontSize: "20px",
            }}
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default ConnectModal;
