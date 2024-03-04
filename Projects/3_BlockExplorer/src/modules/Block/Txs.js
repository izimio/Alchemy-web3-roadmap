import React from "react";
import TagIcon from "@mui/icons-material/Tag";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

export default function Txs({ txs }) {
  return (
    <div>
      <h1>Transactions({txs.length}): </h1>
      <div
        style={{
          display: "grid",
          gap: "10px",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        {txs.map((tx, index) => (
          <Box
            key={index}
            sx={{
              cursor: "pointer",
              display: "flex",
              gap: "10px",
              "&:hover": {
                backgroundColor: "lightgray",
                color: "lightcoral",
              },
              "&:hover > span": {
                color: "black",
              },
            }}
          >
            <TagIcon
              sx={{
                transition: "all 0.3s",
              }}
            />
            <Link to={`/tx/${tx}`}>
              <span>{tx} </span>
            </Link>
          </Box>
        ))}
      </div>
    </div>
  );
}
