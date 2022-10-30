import { deployments, ethers, getNamedAccounts, network } from "hardhat";
import { BLOCK_CONFIRMATION, deploymentChains, networkConfig } from "../helper-hardhat.config";
import verify from "../utils/verify";

async function deployBasicNFT() {

    const { deployer } = await getNamedAccounts();
    const { deploy, log } = deployments;

    log(`Deploying to ${network.name}..`)

    const args = [networkConfig[network.config.chainId!].NFTName, networkConfig[network.config.chainId!].NFTSymbol];

    const waitBlockConfirmations = deploymentChains.includes(network.name) ? 1 : BLOCK_CONFIRMATION;

    const basicNft = await deploy("BasicNft", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: waitBlockConfirmations
    });

    log("Deployed successfully.");

    if(!deploymentChains.includes(network.name) && process.env.ETHERSCAN_APIKEY) {
        // Verify the deployment
        log("Verifying...")

        await verify(basicNft.address, args)

        log("Verified");
    }
}

export default deployBasicNFT;
deployBasicNFT.tags = ["all", "basicNft"];