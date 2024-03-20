require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const { SEPOLIA_URL, PRIVATE_KEY } = process.env;

if (!SEPOLIA_URL || !PRIVATE_KEY) {
  throw new Error("Please set your SEPOLIA_URL and PRIVATE_KEY in a .env file");
}

module.exports = {
  solidity: "0.8.17",
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY]
    }
  }
};
