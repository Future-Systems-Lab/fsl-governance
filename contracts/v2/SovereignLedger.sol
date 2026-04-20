// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SovereignLedger
 * @dev On-chain session governance — registers claims (session records)
 *      anchored to participant wallet addresses. Open registration,
 *      immutable once recorded. Owner can pause for emergencies.
 */
contract SovereignLedger is Ownable {
    struct Claim {
        address participant;
        address guide;
        string sessionHash;     // IPFS CID or hash of session data
        string claimType;       // "session", "attestation", "superbill"
        uint256 timestamp;
        bool verified;
    }

    uint256 public claimCount;
    mapping(uint256 => Claim) public claims;
    mapping(address => uint256[]) public participantClaims;
    mapping(address => uint256[]) public guideClaims;
    bool public paused;

    event ClaimRegistered(
        uint256 indexed claimId,
        address indexed participant,
        address indexed guide,
        string sessionHash,
        string claimType,
        uint256 timestamp
    );
    event ClaimVerified(uint256 indexed claimId, address indexed verifier);
    event Paused(address account);
    event Unpaused(address account);

    modifier whenNotPaused() {
        require(!paused, "SovereignLedger: paused");
        _;
    }

    constructor() Ownable() {}

    /**
     * @dev Register a new claim. Open to all — participants and guides
     *      can both register session records.
     */
    function registerClaim(
        address _participant,
        address _guide,
        string calldata _sessionHash,
        string calldata _claimType
    ) external whenNotPaused returns (uint256) {
        require(bytes(_sessionHash).length > 0, "Session hash required");
        require(bytes(_sessionHash).length <= 256, "Session hash too long");

        uint256 claimId = claimCount;
        claims[claimId] = Claim({
            participant: _participant,
            guide: _guide,
            sessionHash: _sessionHash,
            claimType: _claimType,
            timestamp: block.timestamp,
            verified: false
        });

        participantClaims[_participant].push(claimId);
        guideClaims[_guide].push(claimId);
        claimCount++;

        emit ClaimRegistered(claimId, _participant, _guide, _sessionHash, _claimType, block.timestamp);
        return claimId;
    }

    /**
     * @dev Verify a claim — only the guide who registered it or the owner.
     */
    function verifyClaim(uint256 _claimId) external {
        Claim storage claim = claims[_claimId];
        require(claim.timestamp > 0, "Claim does not exist");
        require(!claim.verified, "Already verified");
        require(msg.sender == claim.guide || msg.sender == owner(), "Not authorized");

        claim.verified = true;
        emit ClaimVerified(_claimId, msg.sender);
    }

    function getParticipantClaims(address _participant) external view returns (uint256[] memory) {
        return participantClaims[_participant];
    }

    function getGuideClaims(address _guide) external view returns (uint256[] memory) {
        return guideClaims[_guide];
    }

    function pause() external onlyOwner {
        paused = true;
        emit Paused(msg.sender);
    }

    function unpause() external onlyOwner {
        paused = false;
        emit Unpaused(msg.sender);
    }
}
