import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Brionne", function () {
  async function deploy() {
    const [owner, otherAccount] = await ethers.getSigners();

    const Brionne = await ethers.getContractFactory("Brionne");
    const brionne = await Brionne.deploy();

    return { brionne, owner, otherAccount };
  }

  it("Should have correct supply for deployer", async function () {

    const { brionne, owner } = await loadFixture(deploy);

    const ownerBalance = await brionne.balanceOf(owner.address);
    expect(ownerBalance).to.equal("69610000000000000000000");
  });

});
