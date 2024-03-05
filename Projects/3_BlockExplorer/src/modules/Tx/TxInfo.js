import React from "react";

const TransactionInfo = ({ transaction }) => {
  const renderLogs = () => {
    return transaction.logs.map((log, index) => (
      <div key={index} style={styles.logContainer}>
        <p>
          <strong>Transaction Index:</strong> {log.transactionIndex}
        </p>
        <p>
          <strong>Block Number:</strong> {log.blockNumber}
        </p>
        <p>
          <strong>Transaction Hash:</strong> {log.transactionHash}
        </p>
        <p>
          <strong>Address:</strong> {log.address}
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
        <strong>To:</strong> {transaction.to}
      </p>
      <p>
        <strong>From:</strong> {transaction.from}
      </p>
      <p>
        <strong>Transaction Index:</strong> {transaction.transactionIndex}
      </p>
      <p>
        <strong>Gas Used:</strong> {transaction.gasUsed.hex}
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
        <strong>Countract Address</strong> {transaction.contractAddress || "N/A"}
      </p>
      <p>
        <strong>Block Hash:</strong> {transaction.blockHash}
      </p>
      <p>
        <strong>Transaction Hash:</strong> {transaction.transactionHash}
      </p>
      <div>
        <p style={styles.logsHeader}>
          <strong>Logs:</strong>
        </p>
        {renderLogs()}
      </div>
      <p>
        <strong>Block Number:</strong> {transaction.blockNumber}
      </p>
      <p>
        <strong>Confirmations:</strong> {transaction.confirmations}
      </p>
      <p>
        <strong>Cumulative Gas Used:</strong>{" "}
        {transaction.cumulativeGasUsed.hex}
      </p>
      <p>
        <strong>Effective Gas Price:</strong>{" "}
        {transaction.effectiveGasPrice.hex}
      </p>
      <p>
        <strong>Status:</strong> {transaction.status}
      </p>
      <p>
        <strong>Type:</strong> {transaction.type}
      </p>
      <p>
        <strong>Byzantium:</strong> {transaction.byzantium ? "true" : "false"}
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
    marginBottom: "5px",
  },
};

export default TransactionInfo;
