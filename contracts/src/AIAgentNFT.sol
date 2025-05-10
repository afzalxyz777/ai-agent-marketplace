// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/// @title AIAgentNFT
/// @notice Mint and manage unique AI-agent NFTs
contract AIAgentNFT is ERC721 {
    /// @notice ID for the next minted NFT
    uint256 public nextTokenId;

    /// @dev Set token name and symbol
    constructor() ERC721("AIAgentNFT", "AIAGENT") {
        // nextTokenId starts at 0
    }

    /// @notice Mint a new agent NFT to the caller
    /// @dev Anyone can call this function to mint their own NFT
    function mint() external {
        _safeMint(msg.sender, nextTokenId);
        nextTokenId++;
    }
}


