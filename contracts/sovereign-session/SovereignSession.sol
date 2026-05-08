// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

/**
 * @title SovereignSession
 * @notice On-chain attestation for wallet-native video sessions.
 *         Records ONLY that a session occurred between two wallets.
 *         No PHI, no content, no clinical detail — timestamps and addresses only.
 * @dev Part of the FSL sovereign data governance infrastructure.
 *      Behavioral health proving ground — operates outside HIPAA scope by design.
 */
contract SovereignSession {
    struct Session {
        address guide;
        address participant;
        uint256 startTime;
        uint256 endTime;
        bytes32 sessionId;
        bool active;
    }

    mapping(bytes32 => Session) public sessions;
    mapping(address => bytes32[]) public guideSessions;
    mapping(address => bytes32[]) public participantSessions;

    uint256 public sessionCount;

    event SessionStarted(
        bytes32 indexed sessionId,
        address indexed guide,
        address indexed participant,
        uint256 timestamp
    );

    event SessionEnded(
        bytes32 indexed sessionId,
        address indexed guide,
        address indexed participant,
        uint256 startTime,
        uint256 endTime,
        uint256 duration
    );

    /**
     * @notice Start a session attestation. Called when both parties join.
     * @param _participant The participant's wallet address
     * @param _sessionId Unique session identifier (derived from booking hash)
     */
    function startSession(address _participant, bytes32 _sessionId) external {
        require(_participant != address(0), "Invalid participant");
        require(_participant != msg.sender, "Guide cannot be own participant");
        require(sessions[_sessionId].startTime == 0, "Session already exists");

        sessions[_sessionId] = Session({
            guide: msg.sender,
            participant: _participant,
            startTime: block.timestamp,
            endTime: 0,
            sessionId: _sessionId,
            active: true
        });

        guideSessions[msg.sender].push(_sessionId);
        participantSessions[_participant].push(_sessionId);
        sessionCount++;

        emit SessionStarted(_sessionId, msg.sender, _participant, block.timestamp);
    }

    /**
     * @notice End a session attestation. Called when session concludes.
     * @param _sessionId The session to end
     */
    function endSession(bytes32 _sessionId) external {
        Session storage s = sessions[_sessionId];
        require(s.active, "Session not active");
        require(
            msg.sender == s.guide || msg.sender == s.participant,
            "Not a session participant"
        );

        s.endTime = block.timestamp;
        s.active = false;

        emit SessionEnded(
            _sessionId,
            s.guide,
            s.participant,
            s.startTime,
            s.endTime,
            s.endTime - s.startTime
        );
    }

    /**
     * @notice Get session count for a guide
     */
    function getGuideSessionCount(address _guide) external view returns (uint256) {
        return guideSessions[_guide].length;
    }

    /**
     * @notice Get session count for a participant
     */
    function getParticipantSessionCount(address _participant) external view returns (uint256) {
        return participantSessions[_participant].length;
    }
}
