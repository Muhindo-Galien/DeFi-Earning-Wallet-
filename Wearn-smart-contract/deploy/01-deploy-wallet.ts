import { Wallet } from './../typechain-types/contracts/Wallet.sol/Wallet';

import {DeployFunction} from "hardhat-deploy/types"
import {HardhatRuntimeEnvironment} from "hardhat/types"

import {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
}  from "../helper-hardhat-config"

const FUND_AMOUNT = "1000000000000000000000"

const deployRaffle: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
  ) {
    const { deployments, getNamedAccounts, network, ethers } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS

    log("----------------------------------------------------")
    const args: any[] = [
    ]
    const wallet = await deploy("Wallet", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })
    log("Wallet contract deployed at address: ", wallet.address)

}
export default deployRaffle
deployRaffle.tags = ["all", "wallet"]