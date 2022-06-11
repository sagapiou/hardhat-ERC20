const {
  frontEndContractsERC20File,
  frontEndContractFact20File,
  frontEndAbiERCFile,
  frontEndAbiFactFile,
} = require("../helper-hardhat-config")
const fs = require("fs")
const { network } = require("hardhat")

module.exports = async () => {
  if (process.env.UPDATE_FRONT_END != 0) {
    console.log("Writing to front end...")
    await updateContractAddresses()
    await updateAbi()
    console.log("Front end written!")
  }
}

async function updateAbi() {
  const erc20 = await ethers.getContract("ERC20Token")
  fs.writeFileSync(
    frontEndAbiERCFile,
    erc20.interface.format(ethers.utils.FormatTypes.json)
  )
  const erc20Fact = await ethers.getContract("ERC20Factory")
  fs.writeFileSync(
    frontEndAbiFactFile,
    erc20Fact.interface.format(ethers.utils.FormatTypes.json)
  )
}

async function updateContractAddresses() {
  const erc20 = await ethers.getContract("ERC20Token")
  const fact20 = await ethers.getContract("ERC20Factory")

  const contracterc20Addresses = JSON.parse(
    fs.readFileSync(frontEndContractsERC20File, "utf8")
  )
  if (network.config.chainId.toString() in contracterc20Addresses) {
    if (
      !contracterc20Addresses[network.config.chainId.toString()].includes(
        erc20.address
      )
    ) {
      contracterc20Addresses[network.config.chainId.toString()].push(
        erc20.address
      )
    }
  } else {
    contracterc20Addresses[network.config.chainId.toString()] = [erc20.address]
  }
  fs.writeFileSync(
    frontEndContractsERC20File,
    JSON.stringify(contracterc20Addresses)
  )

  const contractfact20Addresses = JSON.parse(
    fs.readFileSync(frontEndContractFact20File, "utf8")
  )
  if (network.config.chainId.toString() in contractfact20Addresses) {
    if (
      !contractfact20Addresses[network.config.chainId.toString()].includes(
        fact20.address
      )
    ) {
      contractfact20Addresses[network.config.chainId.toString()].push(
        fact20.address
      )
    }
  } else {
    contractfact20Addresses[network.config.chainId.toString()] = [
      fact20.address,
    ]
  }
  fs.writeFileSync(
    frontEndContractFact20File,
    JSON.stringify(contractfact20Addresses)
  )
}
module.exports.tags = ["all", "frontend"]
