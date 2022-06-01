import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";

describe("Call should revert when estimated", function () {
  let AllwaysReverts: ContractFactory, Test: ContractFactory;
  let allwaysReverts: Contract, test: Contract;

  before(async function () {
    AllwaysReverts = await ethers.getContractFactory("AllwaysReverts");
    Test = await ethers.getContractFactory("Test");
  });

  it("Should deploy", async function () {
    allwaysReverts = await AllwaysReverts.deploy();
    test = await Test.deploy(allwaysReverts.address);
  });

  it("AllwaysReverts should allways revert", async function () {
    const [owner] = await ethers.getSigners();
    const sendEth = async () => {
      const tx = await owner.sendTransaction({
        to: allwaysReverts.address,
        value: ethers.utils.parseEther("1"),
        gasLimit: 50000,
      });
      await tx.wait();
    };
    await expect(sendEth()).to.be.reverted;
  });

  it("tx should revert when reverted within call", async function () {
    const shouldRevert = async () => {
      const tx = await test.callShouldRevert();
      await tx.wait();
    };
    await expect(shouldRevert()).to.be.reverted;
  });

  it("eth_estimateGas should fail when reverting directly ", async function () {
    await expect(test.estimateGas.directRevert()).to.be.reverted;
  });

  it("eth_estimateGas should fail when reverting in call", async function () {
    await expect(test.estimateGas.callShouldRevert()).to.be.reverted;
  });
});
