import { ethers, upgrades } from 'hardhat';

// TO DO: Place the address of your proxy here!
const proxyAddress = '0xd1c4dB316aFa90c1C8BD7Ead7642070975EC9893';

async function main() {
  const VendingMachineV2 = await ethers.getContractFactory('VendingMachineV2');
  const upgraded = await upgrades.upgradeProxy(proxyAddress, VendingMachineV2);

  const implementationAddress = await upgrades.erc1967.getImplementationAddress(
    proxyAddress
  );

  console.log("The current contract owner is: " + upgraded.owner());
  console.log('Implementation contract address: ' + implementationAddress);
}

main();