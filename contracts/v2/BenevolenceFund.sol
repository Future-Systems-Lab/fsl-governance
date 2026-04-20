// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title BenevolenceFund
 * @dev Sovereign Wellness Benevolence Fund — 3% of every session fee
 *      is contributed here. Annual distribution to top 3 Sovereign Guides
 *      ranked by total HNT earned by their participants.
 *
 *      Distribution (December 31 annually):
 *        1st Place: 50% of annual fund
 *        2nd Place: 30% of annual fund
 *        3rd Place: 20% of annual fund
 *
 *      Owner-only distribution. Receives ETH via receive().
 */
contract BenevolenceFund is Ownable, ReentrancyGuard {
    uint256 public totalContributed;
    uint256 public totalDistributed;
    uint256 public lastDistribution;

    event Contributed(address indexed from, uint256 amount, uint256 timestamp);
    event Distributed(
        address indexed first,
        address indexed second,
        address indexed third,
        uint256 firstAmount,
        uint256 secondAmount,
        uint256 thirdAmount,
        uint256 timestamp
    );

    constructor() Ownable() {}

    /**
     * @dev Receive ETH contributions (3% session fee routing).
     */
    receive() external payable {
        totalContributed += msg.value;
        emit Contributed(msg.sender, msg.value, block.timestamp);
    }

    /**
     * @dev Annual distribution to top 3 Sovereign Guides.
     *      Owner-only. Can only be called once per 300 days minimum.
     */
    function distribute(
        address payable _first,
        address payable _second,
        address payable _third
    ) external onlyOwner nonReentrant {
        require(
            lastDistribution == 0 || block.timestamp >= lastDistribution + 300 days,
            "Distribution too soon — annual only"
        );
        require(_first != address(0) && _second != address(0) && _third != address(0), "Invalid addresses");

        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to distribute");

        uint256 firstAmount = (balance * 50) / 100;
        uint256 secondAmount = (balance * 30) / 100;
        uint256 thirdAmount = balance - firstAmount - secondAmount; // Remainder to avoid rounding dust

        (bool s1,) = _first.call{value: firstAmount}("");
        require(s1, "Transfer to first failed");
        (bool s2,) = _second.call{value: secondAmount}("");
        require(s2, "Transfer to second failed");
        (bool s3,) = _third.call{value: thirdAmount}("");
        require(s3, "Transfer to third failed");

        totalDistributed += balance;
        lastDistribution = block.timestamp;

        emit Distributed(_first, _second, _third, firstAmount, secondAmount, thirdAmount, block.timestamp);
    }

    /**
     * @dev View current fund balance.
     */
    function balance() external view returns (uint256) {
        return address(this).balance;
    }
}
