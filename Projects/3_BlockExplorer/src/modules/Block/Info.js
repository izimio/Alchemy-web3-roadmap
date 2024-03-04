import React from "react";

import TagIcon from "@mui/icons-material/Tag";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import EngineeringIcon from "@mui/icons-material/Engineering";
import MoreIcon from "@mui/icons-material/More";
import OilBarrelIcon from "@mui/icons-material/OilBarrel";

import { Link } from "@mui/material";

function IcoValue({ Icon, value }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        alignItems: "center",
        color: "black",
        width: "45%",
      }}
    >
      <Icon />
      <span>{value || "Nothing to show :/"}</span>
    </div>
  );
}
export default function BlockInfo({ blockInfo }) {
  const feePerGas = Number(blockInfo.baseFeePerGas);
  const maxGas = Number(blockInfo.gasLimit);
  const usedGas = Number(blockInfo.gasUsed);
  const gasPercentage = (usedGas / maxGas) * 100;

  const date = new Date(blockInfo.timestamp * 1000);
  const dateString = date.toUTCString();
  return (
    <div>
      <h1>Block Info:</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <IcoValue Icon={TagIcon} value={blockInfo.hash} />
        <IcoValue Icon={AccessTimeIcon} value={dateString} />
        <IcoValue
          Icon={LocalGasStationIcon}
          value={gasPercentage.toFixed(2) + "%"}
        />
        <IcoValue
          Icon={OilBarrelIcon}
          value={(feePerGas / 1e18).toFixed(20) + " Gwei"}
        />
        <Link href={`/account/${blockInfo.miner}`}>
          <IcoValue Icon={EngineeringIcon} value={blockInfo.miner} />
        </Link>
        <IcoValue Icon={MoreIcon} value={blockInfo.extraData} />
      </div>
    </div>
  );
}
