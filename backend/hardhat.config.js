require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  paths: {
    sources: "./hardhat_contracts",   // was "./contracts"
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  // ... rest of your config
};
