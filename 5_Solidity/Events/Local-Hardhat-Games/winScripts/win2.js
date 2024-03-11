const hre = require("hardhat");

const gameAddr = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318";
const contractName = "Game2";

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
  await game.setX(25);
  await game.setY(25);
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
