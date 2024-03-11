const hre = require("hardhat");

const gameAddr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contractName = "Game1";

function isWinner(receipt) {
  const events = receipt.events;

  for (let i = 0; i < events.length; i++) {
    if (events[i].event === "Winner") {
      console.log("🎉 Winner event found! 🎉");
      return true;
    }
  }
  console.log("😔 Winner event not found 😔");
}


// check logs
async function main() {
  // attach to the game
  const game = await hre.ethers.getContractAt(contractName, gameAddr);

  // do whatever you need to do to win the game here:
  const tx = await game.win();

  // did you win? Check the transaction receipt!
  // if you did, it will be in both the logs and events array
  const receipt = await tx.wait();
  isWinner(receipt);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
