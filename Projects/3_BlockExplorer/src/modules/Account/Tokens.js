import { Utils } from "alchemy-sdk";

import TokenIcon from '@mui/icons-material/Token';

export default function Tokens({ tokens }) {
  return (
    <div>
      {tokens.map((token, index) => {
        const bl = token.tokenBalance / 10 ** token.data.decimals;
        return (
          <div key={index} style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "5px",
          }}>
            <TokenIcon />
            <span> {bl} </span>
            <span> {token.data.symbol} </span>
          </div>
        );
      })}
      <span>...</span>
    </div>
  );
}
