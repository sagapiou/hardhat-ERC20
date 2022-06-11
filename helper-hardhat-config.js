const networkConfig = {
  31337: {
    name: "localhost",
  },
  // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
  // Default one is ETH/USD contract on Kovan
  42: {
    name: "kovan",
    ethUsdPriceFeed: "0x9326BFA02ADD2366b30bacB125260Af641031331",
  },
}
const INITIAL_SUPPLY = "1000000000000000000000000"

const developmentChains = ["hardhat", "localhost"]
const frontEndContractsERC20File =
  "../svelte-ERC20/constants/contractERC20Addresses.json"
const frontEndContractFact20File =
  "../svelte-ERC20/constants/contractFact20Addresses.json"
const frontEndAbiERCFile = "../svelte-ERC20/constants/abiERC.json"
const frontEndAbiFactFile = "../svelte-ERC20/constants/abiFact.json"

module.exports = {
  networkConfig,
  developmentChains,
  INITIAL_SUPPLY,
  frontEndContractsERC20File,
  frontEndContractFact20File,
  frontEndAbiERCFile,
  frontEndAbiFactFile,
}
