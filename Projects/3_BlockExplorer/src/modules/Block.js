import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Spinner from "./Spinner";
import "./App.css";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(settings);

function Block() {
  const {block} = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const [blockNumber, setBlockNumber] = useState(-1);
  const [blockInfo, setBlockInfo] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      if (block === "last" || block === "") {
        setBlockNumber(await alchemy.core.getBlockNumber());
        return;
      }
    
      if (block.startsWith("0x")) {
        setBlockNumber(block);
        return;
      }
  
      const blockNb = parseInt(block);
      if (!isNaN(blockNb) && blockNb > 0) {
        setBlockNumber(blockNb);
        return;
      }
    }
    if(blockNumber !== -1) {
      return;
    }
    getBlockNumber();
  }, [block, blockNumber]);

  useEffect(() => {
    if(blockNumber === -1) return;
    async function getBlockInfo() {
      setBlockInfo(await alchemy.core.getBlockWithTransactions(blockNumber));
      setIsLoading(false);
    }
    getBlockInfo();
  }, [blockNumber]);
  
  if(isLoading) return (<Spinner isLoading={isLoading} />);
  console.log(blockInfo);
  return (
    <div className="App">
      <div>
        {blockInfo && (
          <div>
            <h2>Block Info</h2>
            <div>Block Number: {blockInfo.number}</div>
            <div>Block Hash: {blockInfo.hash}</div>
            <div>Parent Hash: {blockInfo.parentHash}</div>
            <div>Timestamp: {blockInfo.timestamp}</div>
            <div>Transactions: {blockInfo.transactions.length}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Block;
