// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SovereignAchievement
 * @dev ERC-1155 soulbound achievement NFTs for FSL ecosystem.
 *      10 tiers for both practitioners and participants.
 *      Soulbound = non-transferable (transfers are blocked).
 *
 *      Token IDs 1-10:  Participant tiers
 *      Token IDs 11-20: Practitioner (Sovereign Guide) tiers
 *
 *      Tier names:
 *        1/11: Initiate       6/16: Resonant
 *        2/12: Awakened       7/17: Luminary
 *        3/13: Aligned        8/18: Sovereign
 *        4/14: Attuned        9/19: Transcendent
 *        5/15: Integrated    10/20: Ascended
 */
contract SovereignAchievement is ERC1155, Ownable {
    string public name;
    uint256 public constant PARTICIPANT_OFFSET = 0;
    uint256 public constant GUIDE_OFFSET = 10;
    uint256 public constant MAX_TIER = 10;

    mapping(address => uint256) public participantTier;
    mapping(address => uint256) public guideTier;

    event TierAwarded(address indexed recipient, uint256 tierId, string role, uint256 timestamp);

    constructor(string memory _name, string memory _uri) ERC1155(_uri) Ownable() {
        name = _name;
    }

    /**
     * @dev Award a participant tier. Only owner. Each tier is minted once.
     *      Previous tier is not burned — all tiers are retained as history.
     */
    function awardParticipantTier(address _to, uint256 _tier) external onlyOwner {
        require(_tier >= 1 && _tier <= MAX_TIER, "Invalid tier");
        require(_tier > participantTier[_to], "Tier already awarded or lower");

        participantTier[_to] = _tier;
        _mint(_to, PARTICIPANT_OFFSET + _tier, 1, "");

        emit TierAwarded(_to, _tier, "participant", block.timestamp);
    }

    /**
     * @dev Award a guide tier. Only owner.
     */
    function awardGuideTier(address _to, uint256 _tier) external onlyOwner {
        require(_tier >= 1 && _tier <= MAX_TIER, "Invalid tier");
        require(_tier > guideTier[_to], "Tier already awarded or lower");

        guideTier[_to] = _tier;
        _mint(_to, GUIDE_OFFSET + _tier, 1, "");

        emit TierAwarded(_to, _tier, "guide", block.timestamp);
    }

    /**
     * @dev Soulbound: block all transfers except minting (from == address(0)).
     */
    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override {
        require(from == address(0), "SovereignAchievement: soulbound, non-transferable");
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    /**
     * @dev Update the metadata URI. Owner only.
     */
    function setURI(string memory _newURI) external onlyOwner {
        _setURI(_newURI);
    }
}
