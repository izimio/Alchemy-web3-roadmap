import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    goerli: {
      url: "https://eth-goerli.public.blastapi.io",
      accounts:  [""],
    }
  }
};

export default config;
