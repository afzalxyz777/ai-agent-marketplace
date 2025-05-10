// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { AIAgentNFT } from "../src/AIAgentNFT.sol"; // Import the deployed contract
import { Script } from "forge-std/Script.sol";

contract MintAIAgentNFT is Script {
    function run() external {
        // Address of the deployed contract
        address contractAddress = 0x1CfD8455F189c56a4FBd81EB7D4118DB04616BA8;

        // Create an instance of the contract
        AIAgentNFT nft = AIAgentNFT(contractAddress);

        // Start broadcasting the transaction
        vm.startBroadcast();

        // Mint an NFT (this will mint an NFT to the deployer's address)
        nft.mint();

        // Stop broadcasting the transaction
        vm.stopBroadcast();
    }
}
