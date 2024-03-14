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

const ADDR = ["0x0C88A20fd7F7A0B29789f0f21292262d94cA7309", "0xFCAffE6C34118F897A9d8f45366d9b88A434fE73"];

async function main() {

    const { CONTRACT_ADDRESS } = process.env;
    if (!CONTRACT_ADDRESS) {
        throw new Error('Please set CONTRACT_ADDRESS in .env file');
    }

    const [deployer] = await ethers.getSigners();

    console.log("Starting aidrop with the account:", deployer.address);
    const response = await ask("Is this ok ? (yes/no): ");

    if (response !== "yes" && response !== "y") {
        console.log("Exiting airdrop...");
        process.exit(0);
    }

    const Brionne = await ethers.getContractAt("Brionne", CONTRACT_ADDRESS, deployer);
    const unit = ethers.parseEther("0.5");

    await Brionne.airdrop(ADDR, unit);
    console.log("Airdrop done");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
