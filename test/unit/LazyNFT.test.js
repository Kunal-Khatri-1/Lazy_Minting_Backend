const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Lazy NFT Unit tests", function () {
          let LazyNFT, deployer

          beforeEach(async () => {
              const accounts = await ethers.getSigners()
              deployer = accounts[0]

              await deployments.fixture(["all"])
              LazyNFT = await ethers.getContract("LazyNFT")
          })

          describe("Constructor", () => {
              it("initializes contract correctly", async () => {
                  const name = await LazyNFT.name()
                  const symbol = await LazyNFT.symbol()
                  const minterRole = ethers.utils.keccak256(
                      ethers.utils.toUtf8Bytes("CREATOR_ROLE")
                  )

                  assert.equal(name, "Test Lazy NFT Studio")
                  assert.equal(symbol, "TLFS")
                  expect(await LazyNFT.hasRole(minterRole, deployer.address)).to.be.true
              })
          })
      })
