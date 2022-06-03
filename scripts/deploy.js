const { ethers, run, network } = require("hardhat");

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory(
    "SimpleStorage"
  );

  console.log("Deploying contract...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();

  console.log(`deployed contract to: ${simpleStorage.address}`);
  // if (
  //   network.config.chainId === 4 &&
  //   process.env.ETHERSCAN_API_KEY
  // ) {
  //   await simpleStorage.deployTransaction.wait(6);

  //   // await verify(simpleStorage.address, []);
  // }

  const currentValue = await simpleStorage.retrieve();
  console.log(`Current value is: ${currentValue}`);

  // Update the current value
  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);

  const updateValue = await simpleStorage.retrieve();
  console.log(`Update value is: ${updateValue}`);
}

async function verify(contractAddress, args) {
  console.log("verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      contractArguments: args,
    });
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified"))
      console.log("Already verified");

    console.error(error);
  }
}
main()
  .then(() => process.exit(1))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
