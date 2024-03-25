import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import "@openzeppelin/hardhat-upgrades";

import dotenv from "dotenv";
dotenv.config();

const {ALCHEMY_SEPOLIA_URL, PRIVATE_KEY} = process.env;

if (!ALCHEMY_SEPOLIA_URL || !PRIVATE_KEY) {
  throw new Error("ALCHEMY_SEPOLIA_URL and PRIVATE_KEY must be provided");
}

const config: HardhatUserConfig = {
  solidity: "0.8.24",

  networks: {
    sepolia: {
      url: ALCHEMY_SEPOLIA_URL,
      accounts: [PRIVATE_KEY],
    },
  },

  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  defaultNetwork: "localhost",
};

export default config;
