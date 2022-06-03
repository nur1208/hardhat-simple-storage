require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("./tasks/block-number");
require("hardhat-gas-reporter");
require("solidity-coverage");
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// task(
//   "accounts",
//   "Prints the list of accounts",
//   async (taskArgs, hre) => {
//     const accounts = await hre.ethers.getSigners();

//     for (const account of accounts) {
//       console.log(account.address);
//     }
//   }
// );

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const {
  PRIVATE_KEY = "https://eth-rinkeby",
  RINKEBY_RPC_URL = "ACCOUNT",
  ETHERSCAN_API_KEY = "KEY",
  COINMARKETCAP_API_KEY = "KEY",
} = process.env;

module.exports = {
  defaultNetwork: "hardhat",
  solidity: "0.8.7",
  networks: {
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 4,
    },
    localhost: { url: "http://127.0.0.1:8545/", chainId: 31337 },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
};
