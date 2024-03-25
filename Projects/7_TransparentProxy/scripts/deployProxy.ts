import { ethers, upgrades } from 'hardhat';

async function main() {
  const VendingMachineV1 = await ethers.getContractFactory('VendingMachineV1');
  const proxy = await upgrades.deployProxy(VendingMachineV1, [100]);
  await proxy.waitForDeployment();

  const proxyAddr = proxy.target as string;
  const implementationAddress = await upgrades.erc1967.getImplementationAddress(proxyAddr);

  console.log('Proxy contract address: ' + proxy.target);
  console.log('Implementation contract address: ' + implementationAddress);
}

main();
