import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner";
import TransactionInfo from "./TxInfo";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export default function TxModule() {
  const { tx } = useParams();

  const [txInfo, setTxInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [txs, setTxs] = useState(tx);
  useEffect(() => {
    async function getTxInfo() {
      try {
        const tx = await alchemy.core.getTransactionReceipt(txs);
        setTxInfo(tx);
      } catch (e) {
        setTxInfo(null);
      }
      setIsLoading(false);
    }
    getTxInfo();
  }, [tx]);

  if (isLoading) return <Spinner isLoading={isLoading} />;
  if (txInfo === null)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <h2>Transaction not found</h2>
      </div>
    );
  return (
    <div>
      <h1>Tx: {tx}</h1>
      <h1>Transaction Information</h1>
      <pre>{JSON.stringify(txInfo, null, 2)}</pre>
      <TransactionInfo transaction={txInfo} />

    </div>
  );
}
