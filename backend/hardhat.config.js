require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const { HDNodeWallet } = require("ethers");

const mnemonic = process.env.PRIVATE_KEY; // Read the mnemonic from .env
if (!mnemonic) {
  throw new Error(" Mnemonic not found in environment variables!");
}

// Generate the wallet from the mnemonic
const wallet = HDNodeWallet.fromPhrase(mnemonic);

// console.log(" Private Key:", wallet.privateKey);

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/31fe3e47b0a5487086abff34a91e38c3",
      accounts: [wallet.privateKey], // Must be an array
    },
  },
  etherscan: {
    apiKey: {
      sepolia: "NBFIKNWUUQQKN27HD7D4DAGTPUMMVVTSPZ",  // Add your Etherscan API key here
    },
  },
  compilers: [
    { version: "0.8.19" }
  ],
  solidity: "0.8.28",
};


