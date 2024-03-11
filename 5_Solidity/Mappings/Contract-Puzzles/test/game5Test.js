const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    return { game };
  }

  async function impersonateAccount(address) {
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [address],
    });

    return await ethers.getSigner(address);
  }

  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);
    const first = await ethers.getSigner(0);
    const signer = await impersonateAccount("0x0000000000000000000000000000000000000000");
    const signerAddress = await signer.getAddress();
    await first.sendTransaction({to: signerAddress, value: ethers.utils.parseEther("1")});


    await game.connect(signer).win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
