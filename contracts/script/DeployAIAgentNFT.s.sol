// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/AIAgentNFT.sol";

contract DeployAIAgentNFT is Script {
    function run() external {
        // All tx’s after startBroadcast are sent on‑chain
        vm.startBroadcast();

        // Deploy your NFT contract
        AIAgentNFT agent = new AIAgentNFT();

        // Log the address (only in verbose mode)
        console.log("AIAgentNFT deployed at", address(agent));

        vm.stopBroadcast();
    }
}
