pragma solidity ^0.8.4;

import "forge-std/Script.sol";
import "../src/Faucet.sol";

contract FaucetScript is Script {
    function setUp() public {}

    function run() public {
        string memory seedPhrase = vm.readFile(".secret");
        uint256 privateKey = vm.deriveKey(seedPhrase, 0);
        vm.startBroadcast(privateKey);
        Faucet spacebear = new Faucet();

        vm.stopBroadcast();
    }

}