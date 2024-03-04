import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner";
import Txs from "./Txs";
import BlockInfo from "./Info";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(settings);

function Block() {
  const { block } = useParams();

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
    if (blockNumber !== -1) {
      return;
    }
    getBlockNumber();
  }, [block, blockNumber]);

  useEffect(() => {
    if (block === "last") {
      alchemy.ws.on("block", (blockNumber) => setBlockNumber(blockNumber));
    }
  }, [block]);

  useEffect(() => {
    if (blockNumber === -1) return;
    async function getBlockInfo() {
      setBlockInfo(await alchemy.core.getBlock(blockNumber));
      setIsLoading(false);
    }
    getBlockInfo();
  }, [blockNumber]);

  if (isLoading) return <Spinner isLoading={isLoading} />;
  return (
    <div className="App">
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Block: {blockNumber}
      </h1>
      <div>
        <BlockInfo blockInfo={blockInfo} />
      </div>
      <div
        style={{
          marginTop: "6 0px",
        }}
      >
        <Txs txs={blockInfo.transactions} />
      </div>
    </div>
  );
}

export default Block;
