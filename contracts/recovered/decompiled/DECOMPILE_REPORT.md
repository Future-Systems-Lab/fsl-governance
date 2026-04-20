# Bytecode Decompile Report — 2026-04-20

## SovereignLedger (0xf329...A94e)
- **Size:** 729 bytes
- **Detected selectors:** 0x444d95b0, 0xc9100bcb, 0xd1ff515d (all require arguments)
- **No standard ERC interfaces detected** (no ERC-20, ERC-721, ERC-1155, Ownable)
- **Assessment:** Custom contract with 3 functions. Likely `registerClaim(string)` or similar with custom selector names. Too small for OpenZeppelin inheritance.
- **Recommendation:** Rewrite from specs. The v1 was minimal.

## BenevolenceFund (0xbe71...8271)
- **Size:** 214 bytes (very small)
- **Detected selectors:** 0x893d20e8 (getOwner())
- **Assessment:** Extremely minimal contract — just an owner getter. Likely a placeholder or minimal implementation with only owner tracking and a receive() function for ETH.
- **Recommendation:** Rewrite with full fund management logic for v2.

## PractitionerAchievement (0xe23e...f987)
- **Size:** 214 bytes (identical to BenevolenceFund)
- **Identical bytecode to BenevolenceFund**
- **Assessment:** Same placeholder contract deployed to a different address. Not a real ERC-1155 implementation.
- **Recommendation:** Rewrite as proper ERC-1155 soulbound achievement NFT.

## ParticipantAchievement (0x406c...6fc6)
- **Size:** 214 bytes (identical to above two)
- **Same contract deployed three times to different addresses**
- **Recommendation:** Same as above.

## Conclusion

The Sprint 011 deployment appears to have used a minimal placeholder contract for BenevolenceFund and both Achievement contracts (214 bytes each, identical bytecode, only getOwner()). SovereignLedger has custom logic at 729 bytes but no standard interfaces. All four need full rewrites for mainnet — the v1 deployments were proof-of-concept stubs.
