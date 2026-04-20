// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MindMasteryNFT is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;

    mapping(uint256 => string) public levelByTokenId;

    event NFTMinted(address indexed to, uint256 tokenId, string tokenURI, string level);

    constructor() ERC721("MindMasteryNFT", "MMNFT") Ownable() {}

    function mintNFT(address to, string memory tokenURI, string memory level) external onlyOwner {
        uint256 tokenId = nextTokenId;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        levelByTokenId[tokenId] = level;

        emit NFTMinted(to, tokenId, tokenURI, level);

        nextTokenId++;
    }

    function getNFTLevel(uint256 tokenId) external view returns (string memory) {
        address owner = ownerOf(tokenId); // auto-throws if nonexistent
        return levelByTokenId[tokenId];
    }
}
