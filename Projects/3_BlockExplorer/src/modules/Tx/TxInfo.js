import React from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

import { Link } from "@mui/material";


const renderLink = (address) => {
  return <Link href={`/account/${address}`}>{address}</Link>;
};

const renderBlockLink = (blockNumber) => {
  return <Link  sx={{
    color: "lightcoral",
    textDecoration: "underline lightcoral",
  }}
    href={`/block/${blockNumber}`}>{blockNumber}</Link>;
};
const TransactionInfo = ({ transaction }) => {
  const [showLogs, setShowLogs] = React.useState(false);

  const toggleLogs = () => {
    setShowLogs((prev) => !prev);
  };

  const gasUsed = (Number(transaction.gasUsed) / 1e18).toFixed(10);
  const cumulativeGasUsed = (Number(transaction.cumulativeGasUsed) / 1e18).toFixed(10);
  const gasPrice = (Number(transaction.effectiveGasPrice) / 1e18).toFixed(10);


  const renderLogs = () => {
    return transaction.logs.map((log, index) => (
      <div key={index} style={styles.logContainer}>
        <p>
          <strong>Transaction Index:</strong> {log.transactionIndex}
        </p>
        <p>
          <strong>Block Number:</strong> {renderBlockLink(log.blockNumber)}
        </p>
        <p>
          <strong>Transaction Hash:</strong> {log.transactionHash}
        </p>
        <p>
          <strong>Address:</strong> {renderLink(log.address)}
        </p>
        <p>
          <strong>Topics:</strong> {log.topics.join(", ")}
        </p>
        <p>
          <strong>Data:</strong> {log.data}
        </p>
        <p>
          <strong>Log Index:</strong> {log.logIndex}
        </p>
        <p>
          <strong>Block Hash:</strong> {log.blockHash}
        </p>
      </div>
    ));
  };

  return (
    <div style={styles.container}>
      <p>
        <strong>To:</strong> {renderLink(transaction.to)}
      </p>
      <p>
        <strong>From:</strong> {renderLink(transaction.from)}
      </p>
      <p>
        <strong>Transaction Index:</strong> {transaction.transactionIndex}
      </p>
      <p>
        <strong>Gas Used:</strong> {gasUsed}
      </p>
      <p
        style={{
          textOverflow: "ellipsis",
          overflow: "hidden",
        }}
      >
        <strong>Logs Bloom:</strong> {transaction.logsBloom}
      </p>
      <p>
        <strong>Countract Address</strong>{" "}
        {transaction.contractAddress || "N/A"}
      </p>
      <p>
        <strong>Block Hash:</strong> {transaction.blockHash}
      </p>
      <p>
        <strong>Transaction Hash:</strong> {transaction.transactionHash}
      </p>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "20px",  }}>
          <p style={styles.logsHeader}>
            Logs:
          </p>
          {showLogs ? (
            <VisibilityOffIcon
              sx={{
                cursor: "pointer",
              }}
              onClick={toggleLogs}
            />
          ) : (
            <VisibilityIcon
              sx={{
                cursor: "pointer",
              }}
              onClick={toggleLogs}
            />
          )}
        </div>
        {showLogs ? renderLogs() : null}
      </div>
      <p>
        <strong>Block Number:</strong> {renderBlockLink(transaction.blockNumber)}
      </p>
      <p>
        <strong>Confirmations:</strong> {transaction.confirmations} blocks
      </p>
      <p>
        <strong>Cumulative Gas Used:</strong>{" "}
        {cumulativeGasUsed}
      </p>
      <p>
        <strong>Effective Gas Price:</strong>{" "}
        { gasPrice}
      </p>
      <p>
        <strong>Status:</strong> {transaction.status}
      </p>
      <p>
        <strong>Type:</strong> {transaction.type}
      </p>
      <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <strong>Byzantium:</strong> {transaction.byzantium ? <DoneOutlineIcon sx={{
          color: "green",
        }} /> : <NotInterestedIcon  sx={{
          color: "red",
        
        }}/>}
      </p>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "20px",
  },
  logContainer: {
    border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "10px",
  },
  logsHeader: {
    fontWeight: "bold",
  },
};

export default TransactionInfo;
