import { deployments, ethers, getNamedAccounts, network } from "hardhat";
import { BasicNft } from "../typechain-types";
import { assert } from "chai";
import { networkConfig } from "../helper-hardhat.config";

describe("BasicNft", function () {
    let deployer: string;
    let basicNft: BasicNft;
    let chainId: number;
    let basicNftTokenURI = "ipfs://bafybeig37ioir76s7mg5oobetncojcm3c3hxasyd4rvid4jqhy4gkaheg4/?filename=0-PUG.json";
    this.beforeEach(async function() {
        deployer = (await getNamedAccounts()).deployer; 
        await deployments.fixture(["all"]);

        basicNft = await ethers.getContract("BasicNft", deployer);
        chainId = network.config.chainId!;
    })

    describe("constructor", async function() {
        it("initialized the ERC721 with name, symbol and sets tokenId to 0", async function() {
            const name = await basicNft.name();
            const symbol = await basicNft.symbol();
            const tokenId = await basicNft.getTokenId();

            assert.equal(networkConfig[chainId].NFTName, name);
            assert.equal(networkConfig[chainId].NFTSymbol, symbol);
            assert.equal(tokenId.toString(), "0");

        });        
    })

    describe("mintNFT", async function() {
        it("minting NFT", async function() {
            const tx = await basicNft._mintNFT();
            await tx.wait(1); 
            const tokenId = await basicNft.getTokenId();          
            const owner = await basicNft.ownerOf(tokenId);
            assert.equal(owner, deployer);
        })
    })

    describe("tokenURI", async function() {
        it("returns toeknURI", async function() {
            const tokenURI = await basicNft.tokenURI(0);

            assert.equal(tokenURI, basicNftTokenURI);
        })
    })

});
