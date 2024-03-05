import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner";
import FaceIcon from "@mui/icons-material/Face";
import Tokens from "./Tokens";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function Account() {
  const { account } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const [addr, setAddr] = useState(account);
  const [tokens, setTokens] = useState("");
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    async function getAccountAddr() {
      try {
        let tks = await alchemy.core.getTokenBalances(account);
        tks.tokenBalances = tks.tokenBalances.filter((token) => {
          return token.tokenBalance !== "0x0";
        });
        tks.tokenBalances.map((token) => {
          token.tokenBalance = parseInt(token.tokenBalance, 16);
          return token;
        });
        tks.tokenBalances = tks.tokenBalances.sort((a, b) => {
          return b.tokenBalance - a.tokenBalance;
        });
        tks.tokenBalances = tks.tokenBalances.slice(0, 7);
        for (let i = 0; i < tks.tokenBalances.length; i++) {
          let token = tks.tokenBalances[i];
          token.data = await alchemy.core.getTokenMetadata(
            token.contractAddress
          );
          tks.tokenBalances[i] = token;
        }
        setTokens(tks);

        const nonce = await alchemy.core.getTransactionCount(account);
        setNonce(nonce);
      } catch (e) {
        setAddr("");
      }
      setIsLoading(false);
    }
    getAccountAddr();
  }, [addr]);

  if (isLoading) return <Spinner isLoading={isLoading} />;
  if (tokens === "")
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
        <h2>Account not found</h2>
      </div>
    );
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <FaceIcon style={{ fontSize: 50 }} />
        <h2>{addr}</h2>
      </div>
      <h1>Tokens: </h1>
      <Tokens tokens={tokens.tokenBalances} />

      <h1>Nonce: {nonce}</h1>
    </div>
  );
}

export default Account;
