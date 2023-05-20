require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
//c
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
// sameeee
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
// const api = process.env.POLYGONSCAN_API_KEY || "";
// const pvt = process.env.PRIVATE_KEY || "";
// const pvt2 = process.env.PRIVATE_KEYY || "";

module.exports = {
  // solidity: "0.8.4",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
    },
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
