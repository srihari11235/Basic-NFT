export const BLOCK_CONFIRMATION = 6;
export const deploymentChains = ["hardhat", "localhost"];

interface INetworkConfig {
    NFTName: string,
    NFTSymbol: string
}

interface IChainConfig {
    [key: number] : INetworkConfig
}

export const networkConfig : IChainConfig = {
    31337: {
        NFTName: "TestDog",
        NFTSymbol: "Dog"
    },
    5: {
        NFTName: "CuteDoggies",
        NFTSymbol: "Dog"
    }
}