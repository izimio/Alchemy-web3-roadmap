require('@nomicfoundation/hardhat-toolbox');

module.exports = {
  solidity: "0.8.17",
  gasPrice: 0,
  paths: {
    artifacts: "./app/src/artifacts",
  },
  networks: {
    hardhat: {
      gasPrice: 0, // Set gas price to 0
    },
  },

};
