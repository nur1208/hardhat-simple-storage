const { ethers } = require("hardhat");
const { assert, expect } = require("chai");
describe("SimpleStorage", function () {
  let SimpleStorageFactory, simpleStorage;
  before(async function () {
    SimpleStorageFactory = await ethers.getContractFactory(
      "SimpleStorage"
    );

    console.log(" Deploying contract...");
    simpleStorage = await SimpleStorageFactory.deploy();
    await simpleStorage.deployed();
  });

  it("Should start with a favorite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";

    assert.equal(currentValue.toString(), expectedValue);
  });

  it("Should update when we call store", async function () {
    const expectedValue = "7";

    const transactionResponse = await simpleStorage.store(7);
    await transactionResponse.wait(1);

    const updateValue = await simpleStorage.retrieve();

    assert.equal(updateValue.toString(), expectedValue);
  });
});
