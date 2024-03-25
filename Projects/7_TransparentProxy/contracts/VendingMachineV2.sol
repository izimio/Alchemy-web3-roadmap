// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract VendingMachineV2 is Initializable {
  uint public numSodas;
  address public owner;

  mapping(address => uint) public balances;

    modifier isDrinkAvailable() {
        require(numSodas > 0, "No sodas available");
        _;
    }
  function initialize(uint _numSodas) public initializer {
    numSodas = _numSodas;
    owner = msg.sender;
  }

  function purchaseSoda() public payable isDrinkAvailable {
    require(msg.value >= 1000 wei, "You must pay 1000 wei for a soda!");
    balances[msg.sender] += msg.value;
    numSodas--;
  }

  function withdraw() public {
    require(msg.sender == owner, "You are not the owner");
    require(address(this).balance > 0, "You have no balance to withdraw");
    payable(owner).transfer(address(this).balance);
  }
}
