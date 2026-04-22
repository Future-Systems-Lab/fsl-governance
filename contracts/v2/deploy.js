// FSL v2 Contract Deployment Script — Sepolia
// Usage: npx hardhat run contracts/v2/deploy.js --network sepolia
//
// Prerequisites:
//   npm install @openzeppelin/contracts hardhat @nomicfoundation/hardhat-toolbox
//   Set DEPLOYER_PRIVATE_KEY and INFURA_RPC in .env
//
// Deployer wallet: 0xf22cbF25deEeA36FFF828BAf73CCb049345eF248

const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with:", deployer.address);
  console.log("Balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  // 1. EHT v2 — Supply-capped token
  const EHTv2 = await hre.ethers.getContractFactory("EHTv2");
  const eht = await EHTv2.deploy();
  await eht.waitForDeployment();
  console.log("EHTv2 deployed to:", await eht.getAddress());

  // 2. SovereignLedger — Session governance
  const SovereignLedger = await hre.ethers.getContractFactory("SovereignLedger");
  const sl = await SovereignLedger.deploy();
  await sl.waitForDeployment();
  console.log("SovereignLedger deployed to:", await sl.getAddress());

  // 3. BenevolenceFund — Community treasury
  const BenevolenceFund = await hre.ethers.getContractFactory("BenevolenceFund");
  const bf = await BenevolenceFund.deploy();
  await bf.waitForDeployment();
  console.log("BenevolenceFund deployed to:", await bf.getAddress());

  // 4. SovereignAchievement — Unified soulbound NFTs
  const SovereignAchievement = await hre.ethers.getContractFactory("SovereignAchievement");
  const sa = await SovereignAchievement.deploy(
    "FSL Sovereign Achievement",
    "https://api.futuresystemslab.io/api/nft/metadata/{id}"
  );
  await sa.waitForDeployment();
  console.log("SovereignAchievement deployed to:", await sa.getAddress());

  console.log("\n=== DEPLOYMENT COMPLETE ===");
  console.log("Update these addresses in:");
  console.log("  - fsl-governance/contracts/FSL_CONTRACT_REGISTRY.md");
  console.log("  - fsl-command-center/index.html");
  console.log("  - encrypthealth/frontend contract references");
}

main().catch(console.error);
