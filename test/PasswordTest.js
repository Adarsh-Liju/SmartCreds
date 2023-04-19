const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PasswordManager", function() {
  let passwordManager;
  let owner;
  let user1;
  let user2;
  let user3;

  beforeEach(async function () {
    [owner, user1, user2, user3] = await ethers.getSigners();

    const PasswordManager = await ethers.getContractFactory("PasswordManager");
    passwordManager = await PasswordManager.deploy();
    await passwordManager.deployed();
  });

  describe("saveCredentials", function() {
    it("should save credentials for a new website", async function() {
      await passwordManager.saveCredentials("website1", "username1", "password1");
      const result = await passwordManager.getCredentials("website1");
      expect(result).to.equal("website1,username1,password1");
    });

    it("should overwrite credentials for an existing website", async function() {
      await passwordManager.saveCredentials("website1", "username1", "password1");
      await passwordManager.saveCredentials("website1", "username2", "password2");
      const result = await passwordManager.getCredentials("website1");
      expect(result).to.equal("website1,username2,password2");
    });
  });

  describe("getCredentials", function() {
    it("should return empty string for a non-existing website", async function() {
      const result = await passwordManager.getCredentials("website1");
      expect(result).to.equal("");
    });

    it("should return credentials for an existing website", async function() {
      await passwordManager.saveCredentials("website1", "username1", "password1");
      const result = await passwordManager.getCredentials("website1");
      expect(result).to.equal("website1,username1,password1");
    });
  });

  describe("updatePassword", function() {
    it("should update password for an existing website", async function() {
      await passwordManager.saveCredentials("website1", "username1", "password1");
      await passwordManager.updatePassword("website1", "password2");
      const result = await passwordManager.getCredentials("website1");
      expect(result).to.equal("website1,username1,password2");
    });

    it("should revert if new password is empty", async function() {
      await passwordManager.saveCredentials("website1", "username1", "password1");
      await expect(passwordManager.updatePassword("website1", "")).to.be.revertedWith("PasswordManager: new password cannot be empty");
    });

    it("should revert if website does not exist", async function() {
      await expect(passwordManager.updatePassword("website1", "password1")).to.be.revertedWith("PasswordManager: credentials do not exist for website");
    });
  });
});
