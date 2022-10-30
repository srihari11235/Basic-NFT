//SPDC-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract BasicNft is ERC721{

    uint256 private tokenId;
    string constant TOKEN_URI = "ipfs://bafybeig37ioir76s7mg5oobetncojcm3c3hxasyd4rvid4jqhy4gkaheg4/?filename=0-PUG.json";

    constructor (string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        tokenId = 0;
    }

    function _mintNFT() public {
        tokenId += 1;
        _safeMint(msg.sender, tokenId);
    }

    function tokenURI(
        uint256 /* tokenId */
        ) public view override returns(string memory){
        return TOKEN_URI;
    }

    function getTokenId() public view returns(uint256) {
        return tokenId;
    }

}