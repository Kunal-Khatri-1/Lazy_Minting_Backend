const { network } = require("hardhat")
const { verify } = require("../utils/verify")
const { developmentChains } = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts()
    const { deploy, log } = deployments

    log("--------------------------------")

    const args = ["Test Lazy NFT Studio", "TLFS", deployer]

    const LazyNFT = await deploy("LazyNFT", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.waitConfirmations || 1,
    })

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(LazyNFT.address, args)
    }
}

module.exports.tags = ["LazyNFT", "all"]
