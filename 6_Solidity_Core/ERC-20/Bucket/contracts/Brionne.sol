//SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Brionne is ERC20, Ownable {
    uint constant _initial_supply = 69610 * 1e18;

    error NotAcceptingEther();
    error UnknownFunctionSelector();

    constructor() ERC20("Brionne", "BRI") Ownable(msg.sender) {
        _mint(msg.sender, _initial_supply);
    }

    receive() external payable {
        revert NotAcceptingEther();
    }

    fallback() external {
        revert UnknownFunctionSelector();
    }

    function airdrop(
        address[] calldata receivers,
        uint256 ammount
    ) public onlyOwner {
        require(ammount > 0, "Ammount must be greater than 0");
        require(receivers.length > 0, "Receivers array must not be empty");
        require(
            balanceOf(msg.sender) >= ammount * receivers.length,
            "Insufficient balance"
        );

        for (uint256 i = 0; i < receivers.length; i++) {
            _transfer(msg.sender, receivers[i], ammount);
        }
    }
}
