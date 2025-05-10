// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/AIAgentNFT.sol";

contract AIAgentNFTTest is Test {
    AIAgentNFT public agent;
    address public user = address(0x123); // only declared once

    function setUp() public {
        agent = new AIAgentNFT();
    }

    function testMintIncrementsTokenId() public {
        vm.prank(user); // simulate user calling mint
        agent.mint();

        assertEq(agent.ownerOf(0), user);
        assertEq(agent.nextTokenId(), 1);
    }

    function testMintMultiple() public {
        vm.startPrank(user);
        agent.mint();
        agent.mint();
        vm.stopPrank();

        assertEq(agent.ownerOf(0), user);
        assertEq(agent.ownerOf(1), user);
        assertEq(agent.nextTokenId(), 2);
    }
}
