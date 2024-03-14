//SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Brionne is ERC20 {
     uint constant _initial_supply = 69610 * 1e18;
    
    constructor() ERC20("Brionne", "BRI") {
        _mint(msg.sender, _initial_supply);
    }
}
