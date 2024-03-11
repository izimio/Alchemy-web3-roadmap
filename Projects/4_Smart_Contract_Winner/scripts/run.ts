import { ethers } from "hardhat";
import CallWinner from "./CallWinner.json";
import dotenv from "dotenv";
dotenv.config();
const ABI = CallWinner.abi;

const CONTRACT_ADDR = "0x87CF621A4D3Fa42c1271545183622Cb10dB32353";

const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY is not set");
}

const main = async () => {
    const provider = new ethers.JsonRpcProvider("https://goerli.gateway.tenderly.co");
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(CONTRACT_ADDR, ABI, wallet);
    const a = await contract.win();
    console.log("Winner winner chicken dinner");
}
main()