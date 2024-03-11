// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";


interface WinnerContract {
    function attempt() external;
}

contract CallWinner {
    address alchemyContract = 0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502;

    function win() external {
        WinnerContract(alchemyContract).attempt();
    }
}
