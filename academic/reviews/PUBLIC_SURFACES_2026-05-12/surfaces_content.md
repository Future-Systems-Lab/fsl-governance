=== GitHub org profile ===
404: Not Found

=== fsl-governance README ===
# FSL Governance

Sovereign governance repository for Future Systems Lab — agent specs, smart contract registry, IPFS manifest, security scans, and compliance documentation.

## Intellectual Property Status

U.S. Provisional Patent Application No. 64/063,037, filed May 11, 2026.
Confirmation #6697. Patent Center #76121895.
Title: System and Method for Sovereign Data Governance via Wallet-Signed Consent Attestation in a Zero-PHI Behavioral Health Architecture.
Inventor: Margarita Davenport. Future assignee: Future Systems Lab LLC.
Non-provisional conversion deadline: May 11, 2027.

Full filing details and disclosure documents at `academic/patent/`.

## Structure

```
/agents       — 15 AI agent specifications + gateway config
/contracts    — Deployed smart contract addresses (Sepolia)
/ipfs         — IPFS CID manifest for all pinned content
/security     — Dependency audits, ecosystem audits, weekly scan reports
/compliance   — HIPAA position, lexicon guide, sovereignty governance
```

## Automated Security Scans

Weekly scans run every Monday at 6:00 UTC via GitHub Actions:
- npm audit across all frontends
- FSL Lexicon violation scan (non-sovereign language)
- Hardcoded secrets detection
- HTTP (non-HTTPS) endpoint scan

Reports are committed to `/security/WEEKLY_SCAN_YYYY-MM-DD.md`. Issues are auto-created for critical findings.

## Smart Contracts (Sepolia)

| Contract | Address |
|----------|---------|
| HNT v2 | `0x1ae1e10929f008d1f9883ce574a318abd86084e2` |
| EHT | `0xbDaeb1d05E02D2751Ad07121510b5f0C436E2CdC` |
| MindMasteryNFT | `0xCb9EcB00574DB29976c7C54045d443666D5C7771` |
| SovereignLedger | `0xf32979200768e8726d5EC5E5AB0CA7407d64A94e` |
| AlchemistForge | `0xE092336F8f5082e57CcBb341A110C20ad186A324` |
| PractitionerAchievement | `0xe23e39799a47af1c383464c958e7724eed36f987` |
| ParticipantAchievement | `0x406c30894a14b53a6b5700025c06dd0697586fc6` |
| BenevolenceFund | `0xbe710a0a5a80dfa3ca7dfadc959176d545b18271` |

## Agents (15 total)

| # | Agent | Approval |
|---|-------|----------|
| 1 | audit | auto |
| 2 | system_architect | auto |
| 3 | backend | auto |
| 4 | frontend | auto |
| 5 | smart_contract | auto |
| 6 | database | auto |
| 7 | compliance | auto |
| 8 | security | auto |
| 9 | testing | auto |
| 10 | documentation | auto |
| 11 | approval_gate | auto |
| 12 | hypnoneuro | auto |
| 13 | game_architect | auto |
| 14 | natpsy_advisor | auto |
| 15 | orthomolecular_specialist | auto |

---

Future Systems Lab LLC — Wyoming


=== alchemist-forge README ===
# AlchemistForge

Patent Pending — U.S. Provisional Application No. 64/063,037 (filed May 2026)

## Status: Alpha Testnet Demonstration

This contract is deployed on Ethereum Sepolia testnet for architectural demonstration purposes. As of May 2026, all recorded participation is from:
- The principal investigator (Case Study #1, March 2026)
- Content engine awareness campaign wallets (May 2026)

No external organic user adoption has been measured. Formal user study with external participants is planned post-IRB approval. See FSL governance documentation for Phase 2 roadmap.

## Contract

AlchemistForge: [0xE092336F8f5082e57CcBb341A110C20ad186A324](https://eth-sepolia.blockscout.com/address/0xE092336F8f5082e57CcBb341A110C20ad186A324)

Shadow integration meets blockchain. Transmute your shadow on-chain.

Future Systems Lab LLC · Sovereignty by Design


=== Command Center (live HTML) ===
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>FSL Command Center</title>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@300;400;600;700&display=swap" rel="stylesheet">
<style>
  :root {
    --aqua: #00E5FF;
    --blue: #2979FF;
    --violet: #651FFF;
    --grad: linear-gradient(135deg, #00E5FF, #2979FF, #651FFF);
    --grad-text: linear-gradient(90deg, #00E5FF 0%, #2979FF 50%, #651FFF 100%);
    --bg: #060810;
    --card: #0C0F1A;
    --card2: #0F1220;
    --border: #2979FF18;
    --border-hot: #00E5FF55;
    --glow: 0 0 20px #00E5FF22, 0 0 40px #2979FF11;
    --glow-hot: 0 0 15px #00E5FF88, 0 0 30px #2979FF44;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: var(--bg);
    color: #fff;
    font-family: 'Rajdhani', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* Animated grid background */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(#2979FF08 1px, transparent 1px),
      linear-gradient(90deg, #2979FF08 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
    z-index: 0;
  }

  /* Ambient glow blobs */
  body::after {
    content: '';
    position: fixed;
    top: -200px;
    left: -200px;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, #2979FF0A 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    animation: drift 12s ease-in-out infinite alternate;
  }

  @keyframes drift {
    from { transform: translate(0, 0); }
    to { transform: translate(100px, 80px); }
  }

  header {
    position: relative;
    z-index: 10;
    padding: 1.5rem 2.5rem;
    border-bottom: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    backdrop-filter: blur(10px);
    background: #060810cc;
  }

  .logo-block { display: flex; align-items: center; gap: 1rem; }

  .hex-icon {
    width: 44px;
    height: 44px;
    flex-shrink: 0;
  }

  .logo-text h1 {
    font-family: 'Orbitron', monospace;
    font-size: 1rem;
    font-weight: 900;
    background: var(--grad-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  .logo-text p {
    font-size: 0.7rem;
    color: #2979FF88;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-top: 0.1rem;
    font-family: 'Orbitron', monospace;
    font-weight: 400;
  }

  .clock-block { text-align: right; }
  .clock-block .time {
    font-family: 'Orbitron', monospace;
    font-size: 0.9rem;
    background: var(--grad-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .clock-block .date {
    font-size: 0.7rem;
    color: #2979FF66;
    margin-top: 0.2rem;
    letter-spacing: 0.1em;
  }

  .grid {
    position: relative;
    z-index: 5;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 1.25rem;
    padding: 2rem 2.5rem;
  }

  .card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1.5rem;
    transition: border-color 0.3s, box-shadow 0.3s;
    position: relative;
    overflow: hidden;
  }

  .card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: var(--grad);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .card:hover {
    border-color: var(--border-hot);
    box-shadow: var(--glow-hot);
  }

  .card:hover::before { opacity: 1; }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.25rem;
  }

  .card-title {
    font-family: 'Orbitron', monospace;
    font-size: 0.85rem;
    font-weight: 700;
    background: var(--grad-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: 0.05em;
  }

  .card-sub {
    font-size: 0.75rem;
    color: #2979FF66;
    margin-top: 0.3rem;
    letter-spacing: 0.05em;
  }

  .badge {
    font-family: 'Orbitron', monospace;
    font-size: 0.6rem;
    padding: 0.25rem 0.65rem;
    border-radius: 4px;
    letter-spacing: 0.1em;
    white-space: nowrap;
    font-weight: 700;
  }

  .badge.live {
    background: #00E5FF15;
    color: var(--aqua);
    border: 1px solid var(--aqua);
    box-shadow: 0 0 10px #00E5FF33;
    animation: pulse-badge 2s ease-in-out infinite;
  }


=== alchemistforge.io (live) ===
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🔮 AlchemistForge</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>tailwind.config={theme:{extend:{colors:{'af-bg':'#0a0e1a','af-bg-light':'#0d1117','af-card':'#131b2a','af-card-hover':'#1a2332','af-border':'#1e2d3d','af-cyan':'#00d4ff'}}}}</script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Chakra Petch:wght@300;400;500;600;700&display=swap');
    *{margin:0;padding:0;box-sizing:border-box}body{font-family:'Chakra Petch',system-ui,sans-serif;background:#0a0e1a;color:#fff}
    @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}.marquee-track{animation:marquee 30s linear infinite}
    .btn-cyan{background:linear-gradient(135deg,#00d4ff 0%,#0099cc 100%);color:#0a0e1a;font-weight:600;border:none;cursor:pointer;transition:all .2s ease}.btn-cyan:hover{box-shadow:0 0 20px rgba(0,212,255,.4);transform:translateY(-1px)}
    .ecosystem-item{display:flex;align-items:center;gap:12px;padding:12px 16px;border-bottom:1px solid rgba(30,45,61,.3);text-decoration:none;transition:background .15s ease}.ecosystem-item:last-child{border-bottom:none;border-radius:0 0 12px 12px}.ecosystem-item:hover{background:#1a2332}
    .chevron-rotate{transition:transform .2s ease}.chevron-rotate.open{transform:rotate(180deg)}
    .dropdown-card{position:absolute;top:100%;left:0;margin-top:8px;width:288px;background:#131b2a;border:1px solid #1e2d3d;border-radius:12px;box-shadow:0 25px 50px rgba(0,0,0,.5);z-index:50;overflow:hidden}
    .stat-card{background:#131b2a;border:1px solid #1e2d3d;border-radius:12px;padding:20px;text-align:center}
    .glow-text{background:linear-gradient(90deg,#00d4ff,#c084fc,#00d4ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .overlay{position:fixed;inset:0;z-index:40}
  </style>
<link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;600;700&display=swap" rel="stylesheet"></head>
<body>
<div class="w-full bg-black/60 border-b border-af-border/50 overflow-hidden py-1.5"><div class="marquee-track flex whitespace-nowrap" id="ticker" style="width:max-content;"></div></div>
<header class="w-full sticky top-0 z-50"><div class="bg-af-bg-light/95 backdrop-blur-md border-b border-af-border/60"><div class="max-w-7xl mx-auto flex items-center justify-between px-4 py-3"><div style="position:relative;"><button id="brandBtn" style="display:flex;align-items:center;gap:10px;cursor:pointer;border-radius:8px;padding:4px 8px;margin-left:-8px;background:none;border:none;color:inherit;" class="hover:bg-af-card-hover/60"><svg width="28" height="28" viewBox="0 0 32 32" fill="none"><defs><radialGradient id="bg" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="#ff8af5"/><stop offset="50%" stop-color="#c255e8"/><stop offset="100%" stop-color="#7b2cbf"/></radialGradient><radialGradient id="sg" cx="50%" cy="30%" r="70%"><stop offset="0%" stop-color="#ffd700"/><stop offset="100%" stop-color="#b8860b"/></radialGradient></defs><ellipse cx="16" cy="27" rx="8" ry="3" fill="url(#sg)" opacity="0.9"/><rect x="13" y="24" width="6" height="3" rx="1" fill="url(#sg)" opacity="0.8"/><circle cx="16" cy="14" r="10" fill="url(#bg)"/><ellipse cx="13" cy="10" rx="3" ry="2.5" fill="white" opacity="0.35"/><circle cx="19" cy="17" r="1.5" fill="white" opacity="0.2"/></svg><span class="text-lg font-bold text-gray-100 tracking-tight">AlchemistForge</span><svg id="chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="chevron-rotate text-gray-400"><polyline points="6 9 12 15 18 9"/></svg></button><div id="ecoDropdown" class="dropdown-card" style="display:none;"><div style="padding:10px 16px;border-bottom:1px solid rgba(30,45,61,.6);"><p style="font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:#6b7280;font-weight:500;">FSL Ecosystem</p></div><a href="https://encrypthealth.io" target="_blank" class="ecosystem-item"><span style="font-size:18px;">&#x1F9EC;</span><div style="flex:1;"><p style="font-size:14px;font-weight:500;color:#e5e7eb;">EncryptHealth</p><p style="font-size:11px;color:#6b7280;">Sovereign Health Records</p></div><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4b5563" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a><a href="https://hypnoneuro.io" target="_blank" class="ecosystem-item"><span style="font-size:18px;">&#x1F3AE;</span><div style="flex:1;"><p style="font-size:14px;font-weight:500;color:#e5e7eb;">HypnoNeuro</p><p style="font-size:11px;color:#6b7280;">Neuroplasticity Gaming</p></div><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4b5563" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a><a href="https://sovereignledger.io" target="_blank" class="ecosystem-item"><span style="font-size:18px;">&#x2696;&#xFE0F;</span><div style="flex:1;"><p style="font-size:14px;font-weight:500;color:#e5e7eb;">SovereignLedger</p><p style="font-size:11px;color:#6b7280;">Decentralized Legal</p></div><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4b5563" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a></div></div><button id="walletBtn" class="btn-cyan px-5 py-2 rounded-lg text-sm font-semibold">Connect EVM Wallet</button></div></div></header>
<section class="relative flex flex-col items-center justify-center text-center px-4 py-20" style="min-height:60vh;"><div class="absolute inset-0 pointer-events-none" style="background:radial-gradient(ellipse 50% 40% at 50% 30%,rgba(0,212,255,.06) 0%,transparent 70%);"></div><div class="relative z-10"><div class="mx-auto mb-6" style="width:96px;height:96px;"><svg width="96" height="96" viewBox="0 0 32 32" fill="none"><defs><radialGradient id="hb" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="#ff8af5"/><stop offset="50%" stop-color="#c255e8"/><stop offset="100%" stop-color="#7b2cbf"/></radialGradient><radialGradient id="hs" cx="50%" cy="30%" r="70%"><stop offset="0%" stop-color="#ffd700"/><stop offset="100%" stop-color="#b8860b"/></radialGradient></defs><ellipse cx="16" cy="27" rx="8" ry="3" fill="url(#hs)" opacity="0.9"/><rect x="13" y="24" width="6" height="3" rx="1" fill="url(#hs)" opacity="0.8"/><circle cx="16" cy="14" r="10" fill="url(#hb)"/><ellipse cx="13" cy="10" rx="3" ry="2.5" fill="white" opacity="0.35"/><circle cx="19" cy="17" r="1.5" fill="white" opacity="0.2"/><circle cx="16" cy="14" r="10.5" stroke="rgba(255,138,245,0.3)" stroke-width="0.5" fill="none"/></svg></div><h1 class="text-5xl md:text-6xl font-bold mb-6 tracking-tight glow-text">TRANSMUTE YOUR SHADOW</h1><p class="max-w-xl mx-auto text-gray-400 text-lg leading-relaxed mb-10">Shadow integration meets blockchain. Name the darkness you carry, alchemize it on-chain, and own a permanent, immutable record of your transformation. Your inner work, recorded forever on Sepolia.</p><button class="btn-cyan px-8 py-3.5 rounded-xl text-base font-semibold">Begin Your Transmutation</button></div></section>
<div style="max-width:42rem;margin:24px auto 0;padding:12px 16px;background:rgba(0,212,255,0.05);border:1px solid rgba(0,212,255,0.15);border-radius:8px;text-align:center;"><p style="font-size:11px;color:#9ca3af;line-height:1.5;"><strong style="color:#00d4ff;">Phase 1: Demonstration Deployment.</strong> Current on-chain activity reflects architect-initiated transactions and content-engine awareness campaign wallets. External organic participation begins Phase 2 (post-formal user study, post-mainnet migration). All transactions are public and verifiable on <a href="https://sepolia.etherscan.io/address/0xE092336F8f5082e57CcBb341A110C20ad186A324" target="_blank" style="color:#00d4ff;">Sepolia Etherscan</a>.</p></div><section class="max-w-4xl mx-auto px-4 py-12"><div class="grid grid-cols-2 md:grid-cols-4 gap-4"><div class="stat-card"><div style="font-size:24px;margin-bottom:4px;"></div><div style="font-size:20px;font-weight:700;color:#00d4ff;">14</div><div style="font-size:11px;color:#6b7280;margin-top:4px;text-transform:uppercase;letter-spacing:.05em;">Demo TXs</div></div><div class="stat-card"><div style="font-size:24px;margin-bottom:4px;">&#x26D3;&#xFE0F;</div><div style="font-size:20px;font-weight:700;color:#00d4ff;">14</div><div style="font-size:11px;color:#6b7280;margin-top:4px;text-transform:uppercase;letter-spacing:.05em;">Sepolia TXs</div></div><div class="stat-card"><div style="font-size:24px;margin-bottom:4px;">&#x1F311;</div><div style="font-size:20px;font-weight:700;color:#00d4ff;">14</div><div style="font-size:11px;color:#6b7280;margin-top:4px;text-transform:uppercase;letter-spacing:.05em;">On-Chain Records</div></div><div class="stat-card"><div style="font-size:24px;margin-bottom:4px;">&#x2728;</div><div style="font-size:20px;font-weight:700;color:#00d4ff;">7</div><div style="font-size:11px;color:#6b7280;margin-top:4px;text-transform:uppercase;letter-spacing:.05em;">Wallets</div></div></div></section>
<footer style="border-top:1px solid rgba(30,45,61,.4);padding:32px 16px;margin-top:48px;"><div class="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-6 text-sm" style="color:#6b7280;"><span style="color:#00d4ff;font-weight:600;">AlchemistForge</span><span>&#183;</span><a href="https://sepolia.etherscan.io/address/0xE092336F8f5082e57CcBb341A110C20ad186A324" target="_blank" style="color:#6b7280;text-decoration:none;" onmouseover="this.style.color='#00d4ff'" onmouseout="this.style.color='#6b7280'">Sepolia Contract</a><span>&#183;</span><a href="https://github.com/Future-Systems-Lab/alchemist-forge" target="_blank" style="color:#6b7280;text-decoration:none;" onmouseover="this.style.color='#00d4ff'" onmouseout="this.style.color='#6b7280'">GitHub</a></div><div style="text-align:center;font-size:10px;color:#4b5563;margin-top:8px;">Patent Pending — U.S. Provisional Application No. 64/063,037</div></footer>
<script>
var cryptoData=[{s:'XRP',p:'$1.44',c:'2.1',up:true},{s:'XLM',p:'$0.1674',c:'3.4',up:true},{s:'HBAR',p:'$0.0959',c:'4.1',up:true},{s:'ALGO',p:'$0.1292',c:'-0.2',up:false},{s:'ADA',p:'$0.2813',c:'4.2',up:true},{s:'ETH',p:'$2,348.54',c:'1.4',up:true},{s:'BTC',p:'$81,436.00',c:'1.1',up:true},{s:'HNT',label:true}];
var ticker=document.getElementById('ticker');var h='';
for(var i=0;i<2;i++){for(var j=0;j<cryptoData.length;j++){var c=cryptoData[j];if(c.label){h+='<span style="display:inline-flex;align-items:center;gap:4px;margin:0 12px;font-size:12px;color:#9ca3af;white-space:nowrap;"><span style="color:#facc15;font-weight:600;">HNT:</span><span style="color:#fde047;font-size:10px;text-transform:uppercase;letter-spacing:.05em;">SOVEREIGN WELLNESS TOKEN</span><span style="color:#00d4ff;font-size:10px;margin-left:6px;opacity:.6;">&#9670;</span></span>';}else{var col=c.up?'#4ade80':'#f87171';var ar=c.up?'&#9650;':'&#9660;';h+='<span style="display:inline-flex;align-items:center;gap:4px;margin:0 12px;font-size:12px;color:#9ca3af;white-space:nowrap;"><span style="font-weight:500;color:#d1d5db;">'+c.s+':</span><span>'+c.p+'</span><span style="color:'+col+';">'+ar+' '+Math.abs(parseFloat(c.c))+'%</span><span style="color:#00d4ff;font-size:10px;margin-left:6px;opacity:.6;">&#9670;</span></span>';}}}
ticker.innerHTML=h;
var brandBtn=document.getElementById('brandBtn');var ecoDropdown=document.getElementById('ecoDropdown');var chevron=document.getElementById('chevron');var dOpen=false;
var ov=document.createElement('div');ov.className='overlay';ov.style.display='none';document.body.appendChild(ov);
brandBtn.addEventListener('click',function(e){e.stopPropagation();dOpen=!dOpen;ecoDropdown.style.display=dOpen?'block':'none';ov.style.display=dOpen?'block':'none';chevron.classList.toggle('open',dOpen);chevron.style.color=dOpen?'#00d4ff':'';});
ov.addEventListener('click',function(){dOpen=false;ecoDropdown.style.display='none';ov.style.display='none';chevron.classList.remove('open');chevron.style.color='';});
var walletBtn=document.getElementById('walletBtn');var wConnected=false;var wAddr='';
function fmtAddr(a){return a?a.slice(0,5)+'...'+a.slice(-4):'';}
walletBtn.addEventListener('click',function(){if(wConnected){wConnected=false;wAddr='';walletBtn.textContent='Connect EVM Wallet';return;}if(typeof window.ethereum!=='undefined'){window.ethereum.request({method:'eth_requestAccounts'}).then(function(accs){if(accs&&accs.length>0){wAddr=accs[0];wConnected=true;walletBtn.textContent=fmtAddr(wAddr);}}).catch(function(e){console.log('Rejected:',e);});}else{alert('Please install MetaMask or another EVM wallet to connect.');}});
</script>
</body>
</html>


=== hypnoneuro.io (live bundle check) ===
   1 64/063,037
   1 Patent Pending


=== sovereignledger.io (live bundle check) ===


=== encrypthealth.io (check) ===
