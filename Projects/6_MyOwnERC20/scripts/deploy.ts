import { ethers } from "hardhat";
import fs from "fs";


const ask = async (question: string) => {
  return new Promise((resolve) => {
    process.stdout.write(question);
    process.stdin.once("data", (data) => {
      resolve(data.toString().trim());
    });
  });
}

async function main() {

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  // ask if it is ok to deploy

  const response = await ask("Do you want to deploy the contract? (yes/no): ");
  if (response !== "yes" && response !== "y") {
    console.log("Exiting deployment...");
    process.exit(0);
  }

  const Brionne = await ethers.getContractFactory("Brionne");

  const brionne = await Brionne.deploy();

  console.log("Brionne ERC20 deployed to:", brionne.target);
  fs.writeFileSync("deployedAddress.txt", brionne.target as string);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
