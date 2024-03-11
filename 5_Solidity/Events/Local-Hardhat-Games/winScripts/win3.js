const hre = require("hardhat");

const gameAddr = "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82";
const contractName = "Game3";

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
  const tx = await game.win(45);

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
