import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

const {ALCHEMY_RPC, PRIVATE_KEY, ETHERSCAN_API_KEY} = process.env;

if(!ALCHEMY_RPC || !PRIVATE_KEY) {
  throw new Error('Please set ALCHEMY_RPC, PRIVATE_KEY and ETHERSCAN_API_KEY in .env file');
}

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },

  networks: {
    hardhat: {
    },
    sepolia: {
      url: ALCHEMY_RPC,
      accounts: [PRIVATE_KEY]
    }
  },

  etherscan: {
    apiKey: ETHERSCAN_API_KEY ? ETHERSCAN_API_KEY : 'abc'
  }
};

export default config;
