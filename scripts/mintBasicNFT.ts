import { ethers, getNamedAccounts } from "hardhat";
import { BasicNft } from "../typechain-types";

async function main() {

  const { deployer } = await getNamedAccounts();
  const signer = await ethers.getSigner(deployer);

  const basicNftContract: BasicNft = await ethers.getContract("BasicNft", deployer);

  const tx = await basicNftContract._mintNFT();
  await tx.wait(1);

  console.log(`NFT minted`);

  const tokenId = await basicNftContract.getTokenId();
  const owner = await basicNftContract.ownerOf(tokenId);

  console.log(`owner: ${owner}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
