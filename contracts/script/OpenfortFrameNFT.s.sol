// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/OpenfortFrameNFT.sol";

contract DeployOpenfortFrameNFT is Script {
    function run() external {

        uint256 deployPrivKey = vm.envUint("PK_PAYMASTER_OWNER_TESTNET");

        vm.startBroadcast(deployPrivKey);

        // Parameters for the OpenfortFrameNFT constructor
        string memory name = "OpenfortFrameNFT";
        string memory symbol = "OFN";
        string memory baseTokenURI = "https://openfort.xyz/docs";
        address trustedForwarder = address(0xc82BbE41f2cF04e3a8efA18F7032BDD7f6d98a81);

        // Deploy the OpenfortFrameNFT contract
        OpenfortFrameNFT openfortFrameNFT = new OpenfortFrameNFT(name, symbol, baseTokenURI, trustedForwarder);

        vm.stopBroadcast();
    }
}


