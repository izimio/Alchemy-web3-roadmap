import { ethers } from "hardhat";

async function main() {

    const [deployer] = await ethers.getSigners();

    const Brionne = await ethers.getContractFactory("Brionne");
    const brionne = await Brionne.deploy();

    const Bucket = await ethers.getContractFactory("Bucket");
    const bucket = await Bucket.deploy();

    console.log("Brionne ERC20 deployed to:", brionne.target);
    console.log("Bucket deployed to:", bucket.target);

    await brionne.approve(bucket.target, 25);

    const res = await bucket.drop(brionne.target, 25);
    const receipt = await res.wait();

    // fetching the event
    const evt = receipt.logs[1];
    if (!evt) {
        throw new Error("No events found");
    }

    if (evt.fragment.name === "Winner" && evt.args[0] == deployer.address) {
        console.log("You won!");
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

// 0x5FbDB2315678afecb367f032d93F642f64180aa3
