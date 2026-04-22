// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title EHT v2 — Energetic Healing Token
 * @dev ERC-20 with hard supply cap. Owner can mint up to MAX_SUPPLY only.
 *      Includes burn mechanism for deflationary pressure.
 *      Resonance tracking preserved from v1 but applied consistently
 *      to both transfer() and transferFrom().
 */
contract EHTv2 is ERC20, ERC20Burnable, Ownable {
    uint256 public constant MAX_SUPPLY = 144_000 * 10**18; // Hard cap: 144,000 EHT

    mapping(address => uint256) public lastResonanceTimestamp;

    event ResonanceActivated(address indexed holder, uint256 timestamp);

    constructor() ERC20("Energetic Healing Token", "EHT") Ownable() {
        _mint(msg.sender, MAX_SUPPLY);
    }

    /**
     * @dev Mint new tokens. Owner-only. Reverts if minting would exceed MAX_SUPPLY.
     */
    function mint(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Cannot mint to zero address");
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        _mint(to, amount);
    }

    /**
     * @dev Transfer with resonance tracking on both sender and receiver.
     */
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        _activateResonance(msg.sender);
        _activateResonance(to);
        return super.transfer(to, amount);
    }

    /**
     * @dev TransferFrom with resonance tracking (fixes v1 inconsistency).
     */
    function transferFrom(address from, address to, uint256 amount) public virtual override returns (bool) {
        _activateResonance(from);
        _activateResonance(to);
        return super.transferFrom(from, to, amount);
    }

    function _activateResonance(address holder) internal {
        lastResonanceTimestamp[holder] = block.timestamp;
        emit ResonanceActivated(holder, block.timestamp);
    }

    /**
     * @dev Check if holder has been active in the last 24 hours.
     */
    function isActive(address holder) external view returns (bool) {
        return block.timestamp - lastResonanceTimestamp[holder] < 86400;
    }
}
