# FSL Command Center — Live Content Capture
## URL: fsl-command-center.vercel.app
## Captured: Tue May 12 19:46:52 EDT 2026

=== FULL HTML ===
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

  .badge.pending {
    background: #FFD70015;
    color: #FFD700;
    border: 1px solid #FFD70066;
  }

  .badge.building {
    background: #2979FF15;
    color: var(--blue);
    border: 1px solid #2979FF66;
  }

  @keyframes pulse-badge {
    0%, 100% { box-shadow: 0 0 8px #00E5FF33; }
    50% { box-shadow: 0 0 16px #00E5FF66; }
  }

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid #2979FF0C;
    font-size: 0.82rem;
  }

  .item:last-child { border-bottom: none; }
  .item-label { color: #ffffff44; letter-spacing: 0.05em; }

  .item-value {
    color: #fff;
    font-family: 'Orbitron', monospace;
    font-size: 0.68rem;
    letter-spacing: 0.03em;
  }

  .item-value a {
    background: var(--grad-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-decoration: none;
  }

  .item-value a:hover { text-decoration: underline; }

  .dot {
    display: inline-block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    margin-right: 0.4rem;
  }

  .dot.green {
    background: var(--aqua);
    box-shadow: 0 0 8px var(--aqua);
    animation: dot-pulse 2s ease-in-out infinite;
  }

  .dot.yellow { background: #FFD700; }
  .dot.grey { background: #ffffff22; }

  @keyframes dot-pulse {
    0%, 100% { box-shadow: 0 0 4px var(--aqua); }
    50% { box-shadow: 0 0 12px var(--aqua), 0 0 20px #2979FF66; }
  }

  .full-width { grid-column: 1 / -1; }

  .agent-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .agent-chip {
    background: #2979FF08;
    border: 1px solid #2979FF22;
    border-radius: 6px;
    padding: 0.4rem 0.5rem;
    font-size: 0.62rem;
    color: #00E5FF;
    text-align: center;
    font-family: 'Orbitron', monospace;
    letter-spacing: 0.05em;
    transition: border-color 0.2s, background 0.2s;
  }

  .agent-chip:hover {
    border-color: var(--aqua);
    background: #00E5FF0F;
  }

  .stat-row {
    display: flex;
    gap: 1rem;
    margin-top: 1.25rem;
  }

  .stat {
    flex: 1;
    background: linear-gradient(135deg, #2979FF0A, #00E5FF05);
    border: 1px solid #2979FF22;
    border-radius: 10px;
    padding: 1rem;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .stat::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: var(--grad);
    opacity: 0.4;
  }

  .stat-num {
    font-family: 'Orbitron', monospace;
    font-size: 1.6rem;
    font-weight: 900;
    background: var(--grad-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .stat-label {
    font-size: 0.62rem;
    color: #2979FF88;
    margin-top: 0.3rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-family: 'Orbitron', monospace;
  }

  footer {
    position: relative;
    z-index: 5;
    text-align: center;
    padding: 1.5rem;
    border-top: 1px solid var(--border);
    font-family: 'Orbitron', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    background: var(--grad-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Progress Tracker */
  .full-width { grid-column: 1 / -1; }

  .tracker-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.5rem;
  }

  .phase-block { margin-bottom: 1.5rem; }

  .phase-label {
    font-family: 'Orbitron', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    color: #2979FF88;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .phase-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  .timeline {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .tl-item {
    display: grid;
    grid-template-columns: 28px 1fr auto;
    gap: 0.75rem;
    align-items: flex-start;
    position: relative;
    padding-bottom: 1rem;
  }

  .tl-item:last-child { padding-bottom: 0; }

  .tl-item:not(:last-child) .tl-line::after {
    content: '';
    position: absolute;
    left: 13px;
    top: 28px;
    bottom: 0;
    width: 1px;
    background: var(--border);
  }

  .tl-node {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.6rem;
    font-family: 'Orbitron', monospace;
    font-weight: 900;
    flex-shrink: 0;
    position: relative;
    z-index: 2;
  }

  .tl-node.done {
    background: #00E5FF18;
    border: 2px solid var(--aqua);
    color: var(--aqua);
    box-shadow: 0 0 12px #00E5FF44;
  }

  .tl-node.active {
    background: #2979FF18;
    border: 2px solid var(--blue);
    color: var(--blue);
    box-shadow: 0 0 12px #2979FF66;
    animation: pulse-node 2s ease-in-out infinite;
  }

  .tl-node.pending {
    background: #ffffff08;
    border: 2px solid #ffffff18;
    color: #ffffff33;
  }

  @keyframes pulse-node {
    0%, 100% { box-shadow: 0 0 8px #2979FF44; }
    50% { box-shadow: 0 0 20px #2979FF88; }
  }

  .tl-line { position: relative; }

  .tl-content { padding-top: 0.2rem; }

  .tl-title {
    font-family: 'Rajdhani', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    color: #fff;
    line-height: 1.2;
  }

  .tl-title.done-text { color: var(--aqua); }
  .tl-title.active-text { color: #fff; }
  .tl-title.pending-text { color: #ffffff55; }

  .tl-sub {
    font-size: 0.72rem;
    color: #2979FF88;
    margin-top: 0.15rem;
    font-family: 'Rajdhani', sans-serif;
  }

  .tl-addr {
    font-family: 'Orbitron', monospace;
    font-size: 0.6rem;
    color: var(--aqua);
    margin-top: 0.2rem;
    opacity: 0.7;
  }

  .tl-addr a {
    color: var(--aqua);
    text-decoration: none;
  }

  .tl-addr a:hover { opacity: 1; text-decoration: underline; }

  .tl-badge {
    font-family: 'Orbitron', monospace;
    font-size: 0.55rem;
    padding: 0.2rem 0.5rem;
    border-radius: 3px;
    letter-spacing: 0.08em;
    font-weight: 700;
    white-space: nowrap;
    margin-top: 0.2rem;
    align-self: flex-start;
  }

  .tl-badge.done { background: #00E5FF15; color: var(--aqua); border: 1px solid #00E5FF44; }
  .tl-badge.active { background: #2979FF15; color: var(--blue); border: 1px solid #2979FF66; }
  .tl-badge.pending { background: #ffffff08; color: #ffffff33; border: 1px solid #ffffff18; }

  .overall-bar-wrap {
    margin-bottom: 1.5rem;
  }

  .overall-bar-label {
    display: flex;
    justify-content: space-between;
    font-family: 'Orbitron', monospace;
    font-size: 0.65rem;
    color: #2979FF88;
    margin-bottom: 0.5rem;
    letter-spacing: 0.1em;
  }

  .overall-bar {
    height: 6px;
    background: #ffffff0a;
    border-radius: 3px;
    overflow: hidden;
  }

  .overall-bar-fill {
    height: 100%;
    background: var(--grad);
    border-radius: 3px;
    width: 18%;
    box-shadow: 0 0 10px #00E5FF44;
    transition: width 1s ease;
  }

  .contract-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 0.75rem;
    margin-top: 1rem;
  }

  .contract-chip {
    background: #0F1220;
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    transition: border-color 0.2s;
  }

  .contract-chip:hover { border-color: var(--border-hot); }

  .contract-chip-name {
    font-family: 'Orbitron', monospace;
    font-size: 0.65rem;
    font-weight: 700;
    background: var(--grad-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: 0.08em;
  }

  .contract-chip-addr {
    font-family: 'Orbitron', monospace;
    font-size: 0.6rem;
    color: var(--aqua);
    opacity: 0.7;
  }

  .contract-chip-addr a { color: var(--aqua); text-decoration: none; }
  .contract-chip-addr a:hover { opacity: 1; text-decoration: underline; }

  .contract-chip-net {
    font-size: 0.65rem;
    color: #2979FF66;
    font-family: 'Rajdhani', sans-serif;
  }

  /* Scanline effect */
  .scanline {
    position: fixed;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00E5FF44, transparent);
    animation: scan 4s linear infinite;
    pointer-events: none;
    z-index: 100;
  }

  @keyframes scan {
    from { top: 0; }
    to { top: 100vh; }
  }

  .agent-chip { cursor: pointer; }
  .modal-overlay {
    display: none; position: fixed; inset: 0;
    background: #060810cc; backdrop-filter: blur(6px);
    z-index: 1000; align-items: center; justify-content: center;
  }
  .modal-overlay.open { display: flex; }
  .modal {
    background: #0C0F1A; border: 1px solid #00E5FF55;
    border-radius: 14px; padding: 2rem; max-width: 500px; width: 90%;
    position: relative; box-shadow: 0 0 40px #00E5FF22;
    animation: modal-in 0.2s ease;
  }
  @keyframes modal-in {
    from { opacity: 0; transform: scale(0.95) translateY(10px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }
  .modal::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(135deg, #00E5FF, #2979FF, #651FFF);
    border-radius: 14px 14px 0 0;
  }
  .modal-close {
    position: absolute; top: 1rem; right: 1rem; background: none;
    border: 1px solid #2979FF33; border-radius: 4px; color: #2979FF88;
    font-family: 'Orbitron', monospace; font-size: 0.6rem;
    padding: 0.25rem 0.5rem; cursor: pointer; letter-spacing: 0.1em;
  }
  .modal-close:hover { border-color: #00E5FF; color: #00E5FF; }
  .modal-agent-name {
    font-family: 'Orbitron', monospace; font-size: 1rem; font-weight: 900;
    background: linear-gradient(90deg, #00E5FF 0%, #2979FF 50%, #651FFF 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; margin-bottom: 0.3rem; padding-right: 3rem;
  }
  .modal-tier { font-size: 0.65rem; color: #2979FF88; font-family: 'Orbitron', monospace; letter-spacing: 0.12em; margin-bottom: 1.25rem; }
  .modal-section-label { font-family: 'Orbitron', monospace; font-size: 0.6rem; color: #2979FF66; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 0.5rem; margin-top: 1rem; }
  .modal-skills { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .skill-tag { background: #00E5FF0F; border: 1px solid #00E5FF33; border-radius: 4px; padding: 0.2rem 0.5rem; font-size: 0.62rem; color: #00E5FF; font-family: 'Rajdhani', sans-serif; font-weight: 600; }
  .modal-responsibilities { list-style: none; padding: 0; }
  .modal-responsibilities li { font-size: 0.8rem; color: #ffffffcc; font-family: 'Rajdhani', sans-serif; padding: 0.3rem 0 0.3rem 1rem; border-bottom: 1px solid #ffffff08; position: relative; }
  .modal-responsibilities li::before { content: '›'; position: absolute; left: 0; color: #00E5FF; font-weight: 700; }
  .modal-responsibilities li:last-child { border-bottom: none; }

  .proj-modal-overlay {
    display: none; position: fixed; inset: 0;
    background: #060810ee; backdrop-filter: blur(8px);
    z-index: 2000; align-items: flex-start; justify-content: center;
    padding: 2rem 1rem; overflow-y: auto;
  }
  .proj-modal-overlay.open { display: flex; }
  .proj-modal {
    background: #0C0F1A; border: 1px solid #00E5FF55;
    border-radius: 14px; padding: 2rem; max-width: 620px; width: 100%;
    position: relative; box-shadow: 0 0 60px #00E5FF18;
    animation: modal-in 0.2s ease; margin: auto;
  }
  .proj-modal::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(135deg, #00E5FF, #2979FF, #651FFF);
    border-radius: 14px 14px 0 0;
  }
  .proj-modal-close {
    position: absolute; top: 1rem; right: 1rem; background: none;
    border: 1px solid #2979FF33; border-radius: 4px; color: #2979FF88;
    font-family: 'Orbitron', monospace; font-size: 0.6rem;
    padding: 0.25rem 0.5rem; cursor: pointer; letter-spacing: 0.1em;
  }
  .proj-modal-close:hover { border-color: #00E5FF; color: #00E5FF; }
  .proj-modal-title {
    font-family: 'Orbitron', monospace; font-size: 1.1rem; font-weight: 900;
    background: linear-gradient(90deg, #00E5FF, #2979FF, #651FFF);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; margin-bottom: 0.4rem; padding-right: 3rem;
  }
  .proj-modal-summary {
    font-size: 0.85rem; color: #ffffffaa; font-family: 'Rajdhani', sans-serif;
    line-height: 1.5; margin-bottom: 1.25rem; padding-bottom: 1rem;
    border-bottom: 1px solid #ffffff0a;
  }
  .proj-section-label {
    font-family: 'Orbitron', monospace; font-size: 0.6rem; color: #2979FF66;
    letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 0.6rem; margin-top: 1.25rem;
  }
  .proj-check-list { list-style: none; padding: 0; margin-bottom: 0.5rem; }
  .proj-check-list li {
    font-size: 0.82rem; color: #ffffffcc; font-family: 'Rajdhani', sans-serif;
    padding: 0.25rem 0 0.25rem 1.4rem; position: relative;
    border-bottom: 1px solid #ffffff06;
  }
  .proj-check-list li:last-child { border-bottom: none; }
  .proj-check-list.done li::before { content: '✓'; position: absolute; left: 0; color: #00E5FF; font-weight: 700; font-size: 0.75rem; }
  .proj-check-list.next li::before { content: '→'; position: absolute; left: 0; color: #2979FF; font-weight: 700; }
  .proj-links { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.25rem; }
  .proj-link {
    background: #00E5FF0F; border: 1px solid #00E5FF33; border-radius: 5px;
    padding: 0.3rem 0.75rem; font-size: 0.7rem; color: #00E5FF;
    font-family: 'Orbitron', monospace; text-decoration: none; letter-spacing: 0.05em;
    transition: background 0.2s, border-color 0.2s;
  }
  .proj-link:hover { background: #00E5FF22; border-color: #00E5FF88; }
</style>
<link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;600;700&display=swap" rel="stylesheet"><style>body{font-family:'Chakra Petch',sans-serif}</style></head>
<body>
<div style="background:#0A0A0A;border-bottom:1px solid rgba(0,217,255,0.15);overflow:hidden;white-space:nowrap;height:36px;line-height:36px;font-family:monospace;font-size:0.7rem"><style>@keyframes ccTicker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}</style><div class="fsl-ticker-inner" style="display:inline-block;animation:ccTicker 50s linear infinite"></div></div>

<div class="scanline"></div>

<header>
  <div class="logo-block">
    <svg class="hex-icon" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hexgrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00E5FF"/>
          <stop offset="50%" stop-color="#2979FF"/>
          <stop offset="100%" stop-color="#651FFF"/>
        </linearGradient>
      </defs>
      <polygon points="22,2 40,12 40,32 22,42 4,32 4,12" stroke="url(#hexgrad)" stroke-width="2" fill="#00E5FF08"/>
      <text x="22" y="27" text-anchor="middle" font-family="Orbitron" font-weight="900" font-size="11" fill="#00E5FF" style="filter: drop-shadow(0 0 4px #00E5FF)">FSL</text>
    </svg>
    <div class="logo-text">
      <h1>Future Systems Lab</h1>
      <p style="-webkit-text-fill-color: #00E5FFaa; color: #00E5FFaa;">Command Center · Digital Health · Web3</p>
    </div>
  </div>
  <div class="clock-block">
    <div class="time" id="clock">--:--:--</div>
    <div class="date" id="dateline">UTC</div>
  </div>
</header>

<div class="grid">

  <div class="card" onclick="openProj('hypnoneuro')" style="cursor:pointer;">
    <div class="card-header">
      <div>
        <div class="card-title">🧠 HypnoNeuro</div>
        <div class="card-sub">3 Demos · L1/L2/L3 · MetaMask Gated</div>
      </div>
      <span class="badge live">LIVE</span>
    </div>
    <div class="item"><span class="item-label">Frontend</span><span class="item-value"><a href="https://hypnoneuro.io" target="_blank">hypnoneuro.io</a></span></div>
    <div class="item"><span class="item-label">HNT Token</span><span class="item-value"><a href="https://eth-sepolia.blockscout.com/address/0x411426f8E735F7940B20491609F08817A805b198" target="_blank">0x4114...b198</a></span></div>
    <div class="item"><span class="item-label">MindMastery NFT</span><span class="item-value"><a href="https://eth-sepolia.blockscout.com/address/0xCb9EcB00574DB29976c7C54045d443666D5C7771" target="_blank">0xCb9E...7771</a></span></div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:8px 0;"><div style="background:#0A1628;border:1px solid #2979FF15;border-radius:8px;padding:10px;text-align:center;"><div style="font-size:16px;margin-bottom:4px;">🌊</div><div style="font-size:10px;color:#00E5FF;">Threshold Bloom</div><div style="font-size:9px;color:#ffffff44;">L1 · GABA</div></div><div style="background:#0A1628;border:1px solid #2979FF15;border-radius:8px;padding:10px;text-align:center;"><div style="font-size:16px;margin-bottom:4px;">🧬</div><div style="font-size:10px;color:#00E5FF;">Amino Resonance</div><div style="font-size:9px;color:#ffffff44;">L2 · Serotonin</div></div><div style="background:#0A1628;border:1px solid #2979FF15;border-radius:8px;padding:10px;text-align:center;"><div style="font-size:16px;margin-bottom:4px;">🌟</div><div style="font-size:10px;color:#00E5FF;">Neural Bloom</div><div style="font-size:9px;color:#ffffff44;">L3 · Endocannabinoid</div></div></div><div style="text-align:center;margin-top:4px;"><a href="https://hypnoneuro.io" target="_blank" style="font-size:10px;color:#00E5FF88;text-decoration:none;">View full library on hypnoneuro.io →</a></div>
    <div class="item"><span class="item-label">Wallet Gate</span><span class="item-value"><span class="dot green"></span>Active</span></div>
  </div>

  <div class="card" onclick="openProj('encrypthealth')" style="cursor:pointer;">
    <div class="card-header">
      <div>
        <div class="card-title">🔐 EncryptHealth</div>
        <div class="card-sub">Sovereign Health Data · EHT Token · Sepolia</div>
      </div>
      <span class="badge building">BUILDING</span>
    </div>
    <div class="item"><span class="item-label">MetaMask Login</span><span class="item-value"><a href="https://secure-health-login-dfk6unk2d-megs-projects-95a11e5b.vercel.app/" target="_blank">secure-health-login.vercel.app</a></span></div>
    <div class="item"><span class="item-label">EHT Token</span><span class="item-value"><a href="https://eth-sepolia.blockscout.com/address/0xbDaeb1d05E02D2751Ad07121510b5f0C436E2CdC" target="_blank">0xbDae...2CdC</a></span></div>
    <div class="item"><span class="item-label">Backend</span><span class="item-value"><span class="dot green"></span>PostgreSQL Live</span></div>
    <div class="item"><span class="item-label">Frontend Deploy</span><span class="item-value"><span class="dot yellow"></span>Pending</span></div>
    <div class="item"><span class="item-label">Build Step</span><span class="item-value">Step 2 of 19</span></div>
  </div>

  <div class="card" onclick="openProj('claimchain')" style="cursor:pointer;">
    <div class="card-header">
      <div>
        <div class="card-title">⛓ ClaimChain</div>
        <div class="card-sub">Sovereign Health Governance · Phase 3</div>
      </div>
      <span class="badge live">LIVE</span>
    </div>
    <div class="item"><span class="item-label">Contract</span><span class="item-value"><a href="https://eth-sepolia.blockscout.com/address/0xf32979200768e8726d5EC5E5AB0CA7407d64A94e" target="_blank">0xf329...4A94e</a></span></div>
    <div class="item"><span class="item-label">Backend</span><span class="item-value"><span class="dot green"></span>PostgreSQL + Node API</span></div>
    <div class="item"><span class="item-label">Session Billing</span><span class="item-value"><span class="dot green"></span>On-chain</span></div>
    <div class="item"><span class="item-label">Approval Gate</span><span class="item-value"><span class="dot green"></span>Telegram Active</span></div>
    <div class="item"><span class="item-label">Branch</span><span class="item-value">phase3-expansion</span></div>
  </div>

  <div class="card" onclick="openProj('neurobalance')" style="cursor:pointer;">
    <div class="card-header">
      <div>
        <div class="card-title">⌚ NeuroBalance Watch</div>
        <div class="card-sub">Wearable · Plant Ally · Sovereign Consent</div>
      </div>
      <span class="badge building">BUILDING</span>
    </div>
    <div class="item"><span class="item-label">Neurotransmitter Feed</span><span class="item-value"><span class="dot green"></span>Active</span></div>
    <div class="item"><span class="item-label">Plant Ally Recs</span><span class="item-value"><span class="dot green"></span>Active</span></div>
    <div class="item"><span class="item-label">On-chain Consent</span><span class="item-value"><span class="dot green"></span>Toggle Active</span></div>
    <div class="item"><span class="item-label">Dashboard</span><span class="item-value"><span class="dot yellow"></span>Prototype</span></div>
    <div class="item"><span class="item-label">Vercel Deploy</span><span class="item-value"><span class="dot yellow"></span>Pending</span></div>
  </div>

  <div class="card" onclick="openProj('alchemistforge')" style="cursor:pointer;">
    <div class="card-header">
      <div>
        <div class="card-title">🔮 AlchemistForge</div>
        <div class="card-sub">On-chain Shadow Work · Case Study #1</div>
      </div>
      <span class="badge live">LIVE</span>
    </div>
    <div class="item"><span class="item-label">Contract</span><span class="item-value"><a href="https://eth-sepolia.blockscout.com/address/0xE092336F8f5082e57CcBb341A110C20ad186A324" target="_blank">0xE092...A324</a></span></div>
    <div class="item"><span class="item-label">Participant #1</span><span class="item-value">Dr. Meg — Transmuted ✓</span></div>
    <div class="item"><span class="item-label">Shadow Aspect</span><span class="item-value">web2 → web3 light</span></div>
    <div class="item"><span class="item-label">Events</span><span class="item-value">Transmuted + Celebrated ✓</span></div>
  </div>

  <div class="card" onclick="openProj('infrastructure')" style="cursor:pointer;">
    <div class="card-header">
      <div>
        <div class="card-title">🖥 Infrastructure</div>
        <div class="card-sub">VPS · PostgreSQL · Sepolia · Vercel</div>
      </div>
      <span class="badge live">LIVE</span>
    </div>
    <div class="item"><span class="item-label">VPS</span><span class="item-value">74.208.202.239 · OpenClaw</span></div>
    <div class="item"><span class="item-label">Deployer</span><span class="item-value"><a href="https://eth-sepolia.blockscout.com/address/0xf22cbF25deEeA36FFF828BAf73CCb049345eF248" target="_blank">0xf22c...F248</a></span></div>
    <div class="item"><span class="item-label">Campaign Service</span><span class="item-value"><span class="dot green"></span>Running</span></div>
    <div class="item"><span class="item-label">Daily Summary</span><span class="item-value"><span class="dot green"></span>3:33 AM UTC</span></div>
    <div class="item"><span class="item-label">RPC</span><span class="item-value">Infura Sepolia</span></div>
  </div>

  <!-- PROGRESS TRACKER -->
  <div class="card full-width">
    <div class="tracker-header">
      <div>
        <div class="card-title">📊 FSL Progress Tracker</div>
        <div class="card-sub">EncryptAI Monorepo · 19-Step Canonical Build · DEng Applied Project</div>
      </div>
      <span class="badge building">IN PROGRESS</span>
    </div>

    <div class="overall-bar-wrap">
      <div class="overall-bar-label">
        <span>Overall Build Progress</span>
        <span>2 / 19 Steps Complete</span>
      </div>
      <div class="overall-bar"><div class="overall-bar-fill"></div></div>
    </div>

    <div class="phase-block">
      <div class="phase-label">Phase 1 — Foundation</div>
      <div class="timeline">

        <div class="tl-item">
          <div class="tl-node done">✓</div>
          <div class="tl-line">
            <div class="tl-content">
              <div class="tl-title done-text">Step 01 — Monorepo Setup</div>
              <div class="tl-sub">EncryptAI monorepo · CLAUDE.md · BUILD_LOG.md · fsl-audit.sh</div>
            </div>
          </div>
          <div class="tl-badge done">DONE</div>
        </div>

        <div class="tl-item">
          <div class="tl-node done">✓</div>
          <div class="tl-line">
            <div class="tl-content">
              <div class="tl-title done-text">Step 02 — MetaMask Login (Secure Health Login)</div>
              <div class="tl-sub">Next.js + wagmi 2.16.9 + viem · injected() connector · Live on Vercel</div>
              <div class="tl-addr"><a href="https://secure-health-login-dfk6unk2d-megs-projects-95a11e5b.vercel.app/" target="_blank">secure-health-login.vercel.app</a></div>
            </div>
          </div>
          <div class="tl-badge done">DONE</div>
        </div>

        <div class="tl-item">
          <div class="tl-node active">03</div>
          <div class="tl-line">
            <div class="tl-content">
              <div class="tl-title active-text">Step 03 — EncryptHealth Backend ← ACTIVE</div>
              <div class="tl-sub">Health records API · PostgreSQL schema · Node.js service layer</div>
            </div>
          </div>
          <div class="tl-badge active">ACTIVE</div>
        </div>

        <div class="tl-item">
          <div class="tl-node pending">04</div>
          <div class="tl-line">
            <div class="tl-content">
              <div class="tl-title pending-text">Step 04 — PostgreSQL Integration</div>
              <div class="tl-sub">Unified DB layer · ClaimChain + EncryptHealth schema merge</div>
            </div>
          </div>
          <div class="tl-badge pending">PENDING</div>
        </div>

        <div class="tl-item">
          <div class="tl-node pending">05</div>
          <div class="tl-line">
            <div class="tl-content">
              <div class="tl-title pending-text">Step 05 — Blockchain Writes</div>
              <div class="tl-sub">On-chain health record anchoring · SHA-256 hashing · Sepolia</div>
            </div>
          </div>
          <div class="tl-badge pending">PENDING</div>
        </div>

      </div>
    </div>

    <div class="phase-block">
      <div class="phase-label">Phase 2 — Token & Game Engine</div>
      <div class="timeline">

        <div class="tl-item">
          <div class="tl-node pending">06</div>
          <div class="tl-line">
            <div class="tl-content">
              <div class="tl-title pending-text">Step 06 — Token / NFT Engine</div>
              <div class="tl-sub">HNT · EHT · MindMasteryNFT · 3/6/9 discount model</div>
              <div class="tl-addr">
                HNT: <a href="https://eth-sepolia.blockscout.com/address/0x411426f8E735F7940B20491609F08817A805b198" target="_blank">0x4114...b198</a> ·
                EHT: <a href="https://eth-sepolia.blockscout.com/address/0xbDaeb1d05E02D2751Ad07121510b5f0C436E2CdC" target="_blank">0xbDae...2CdC</a>
              </div>
            </div>
          </div>
          <div class="tl-badge pending">PENDING</div>
        </div>

        <div class="tl-item">
          <div class="tl-node pending">07</div>
          <div class="tl-line">
            <div class="tl-content">
              <div class="tl-title pending-text">Step 07 — L1 Hypnosis Games (9 games)</div>
              <div class="tl-sub">GABA · Serotonin · Dopamine · Oxytocin systems · Browser-based</div>
              <div class="tl-sub" style="color:#00E5FF55;">Game 1 (Threshold Bloom) locked ✓ · Games 2–9 dispatched to agents</div>
            </div>
          </div>
          <div class="tl-badge pending">PENDING</div>
        </div>

        <div class="tl-item">
          <div class="tl-node pending">08</div>
          <div class="tl-line">
            <div class="tl-content">
              <div class="tl-title pending-text">Step 08 — L2 Orthomolecular Games (9 games)</div>
              <div class="tl-sub">Nutrient-neurotransmitter protocols · Endocannabinoid baseline</div>
            </div>
          </div>
          <div class="tl-badge pending">PENDING</div>
        </div>

        <div class="tl-item">
          <div class="tl-node pending">09</div>
          <div class="tl-line">
            <div class="tl-content">
              <div class="tl-title pending-text">Step 09 — L3 Inner-Child Healing Games (9 games)</div>
              <div class="tl-sub">Emotional safety through metaphor · Not direct re-exposure</div>
            </div>
          </div>
          <div class="tl-badge pending">PENDING</div>
        </div>

      </div>
    </div>

    <div class="phase-block">
      <div class="phase-label">Phase 3 — Wearable & Infrastructure</div>
      <div class="timeline">

        <div class="tl-item">
          <div class="tl-node pending">10</div>
          <div class="tl-line">
            <div class="tl-content">
              <div class="tl-title pending-text">Step 10 — NeuroBalance Watch Simulator</div>
              <div class="tl-sub">Neurotransmitter dashboard · On-chain consent toggles</div>
              <div class="tl-addr"><a href="https://neurobalance-deploy.vercel.app" target="_blank">neurobalance-deploy.vercel.app</a></div>
            </div>
          </div>
          <div class="tl-badge pending">PENDING</div>
        </div>

        <div class="tl-item">
          <div class="tl-node pending">11</div>
          <div class="tl-line">
            <div class="tl-content">
              <div class="tl-title pending-text">Step 11 — Watch → Blockchain Loop</div>
              <div class="tl-sub">Wearable data → on-chain writes · Consent-gated · Sepolia</div>
            </div>
          </div>
          <div class="tl-badge pending">PENDING</div>
        </div>

        <div class="tl-item">
          <div class="tl-node pending">12</div>
          <div class="tl-line">
            <div class="tl-content">
              <div class="tl-title pending-text">Step 12 — Labs</div>
              <div class="tl-sub">COA lookup · Lab result integration · EncryptHealth data layer</div>
            </div>
          </div>
          <div class="tl-badge pending">PENDING</div>
        </div>

        <div class="tl-item">
          <div class="tl-node pending">13</div>
          <div class="tl-line">
            <div class="tl-content">
              <div class="tl-title pending-text">Step 13 — COA Lookup</div>
              <div class="tl-sub">Certificate of Analysis · Product verification · On-chain attestation</div>
            </div>
          </div>
          <div class="tl-badge pending">PENDING</div>
        </div>

      </div>
    </div>

    <div class="phase-block">
      <div class="phase-label">Phase 4 — Integration & Launch</div>
      <div class="timeline">

        <div class="tl-item">
          <div class="tl-node pending">14</div>
          <div class="tl-line">
            <div class="tl-content">
              <div class="tl-title pending-text">Step 14 — EncryptAI Homepage</div>
              <div class="tl-sub">Full ecosystem landing page · All products unified</div>
            </div>
          </div>
          <div class="tl-badge pending">PENDING</div>
        </div>

        <div class="tl-item">
          <div class="tl-node pending">15</div>
          <div class="tl-line">
            <div class="tl-content">
              <div class="tl-title pending-text">Step 15 — Integrations</div>
              <div class="tl-sub">ClaimChain ↔ HypnoNeuro · EHT ↔ MindMasteryNFT · Watch ↔ Labs</div>
            </div>
          </div>
          <div class="tl-badge pending">PENDING</div>
        </div>

        <div class="tl-item">
          <div class="tl-node pending">16</div>
          <div class="tl-line">
            <div class="tl-content">
              <div class="tl-title pending-text">Step 16 — Demo</div>
              <div class="tl-sub">End-to-end walkthrough · DEng applied project documentation</div>
            </div>
          </div>
          <div class="tl-badge pending">PENDING</div>
        </div>

        <div class="tl-item">
          <div class="tl-node pending">17</div>
          <div class="tl-line">
            <div class="tl-content">
              <div class="tl-title pending-text">Step 17 — ClaimChain Frontend Deploy</div>
              <div class="tl-sub">Vercel deploy · Sovereign health governance UI</div>
            </div>
          </div>
          <div class="tl-badge pending">PENDING</div>
        </div>

        <div class="tl-item">
          <div class="tl-node pending">18</div>
          <div class="tl-line">
            <div class="tl-content">
              <div class="tl-title pending-text">Step 18 — Open Source PRs Merged</div>
              <div class="tl-sub">ethereum/EIPs · OpenZeppelin · Uniswap · openmrs · bigchaindb · balancer · DIF · hyperledger/fabric</div>
            </div>
          </div>
          <div class="tl-badge pending">PENDING</div>
        </div>

        <div class="tl-item">
          <div class="tl-node pending">19</div>
          <div class="tl-line">
            <div class="tl-content">
              <div class="tl-title pending-text">Step 19 — ASU DEng Enrollment</div>
              <div class="tl-sub">Start October 2026 · FSL as applied doctoral project · Completion Spring 2028</div>
            </div>
          </div>
          <div class="tl-badge pending">PENDING</div>
        </div>

      </div>
    </div>
  </div>

  <!-- CONTRACT REGISTRY -->
  <div class="card full-width">
    <div class="card-header">
      <div>
        <div class="card-title">🔗 Contract Registry — Sepolia Testnet</div>
        <div class="card-sub">All deployed contracts · Blockscout verified · Deployer: 0xf22c...F248</div>
      </div>
      <span class="badge live">SEPOLIA</span>
    </div>
    <div class="contract-grid">
      <div class="contract-chip">
        <div class="contract-chip-name">HypnoNeuroToken (HNT)</div>
        <div class="contract-chip-addr"><a href="https://eth-sepolia.blockscout.com/address/0x411426f8E735F7940B20491609F08817A805b198" target="_blank">0x411426f8E735F7940B20491609F08817A805b198</a></div>
        <div class="contract-chip-net">🧠 HypnoNeuro · ERC-20</div>
      </div>
      <div class="contract-chip">
        <div class="contract-chip-name">EncryptHealthToken (EHT)</div>
        <div class="contract-chip-addr"><a href="https://eth-sepolia.blockscout.com/address/0xbDaeb1d05E02D2751Ad07121510b5f0C436E2CdC" target="_blank">0xbDaeb1d05E02D2751Ad07121510b5f0C436E2CdC</a></div>
        <div class="contract-chip-net">🔐 EncryptHealth · ERC-20</div>
      </div>
      <div class="contract-chip">
        <div class="contract-chip-name">MindMasteryNFT (L1–L3)</div>
        <div class="contract-chip-addr"><a href="https://eth-sepolia.blockscout.com/address/0xCb9EcB00574DB29976c7C54045d443666D5C7771" target="_blank">0xCb9EcB00574DB29976c7C54045d443666D5C7771</a></div>
        <div class="contract-chip-net">🧠 HypnoNeuro · ERC-721</div>
      </div>
      <div class="contract-chip">
        <div class="contract-chip-name">ClaimChain</div>
        <div class="contract-chip-addr"><a href="https://eth-sepolia.blockscout.com/address/0xf32979200768e8726d5EC5E5AB0CA7407d64A94e" target="_blank">0xf32979200768e8726d5EC5E5AB0CA7407d64A94e</a></div>
        <div class="contract-chip-net">⛓ ClaimChain · Sovereign Governance</div>
      </div>
      <div class="contract-chip">
        <div class="contract-chip-name">AlchemistForge / BackupArchive</div>
        <div class="contract-chip-addr"><a href="https://eth-sepolia.blockscout.com/address/0xE092336F8f5082e57CcBb341A110C20ad186A324" target="_blank">0xE092336F8f5082e57CcBb341A110C20ad186A324</a></div>
        <div class="contract-chip-net">🔮 AlchemistForge · Shadow Work</div>
      </div>
      <div class="contract-chip">
        <div class="contract-chip-name">Deployer Wallet</div>
        <div class="contract-chip-addr"><a href="https://eth-sepolia.blockscout.com/address/0xf22cbF25deEeA36FFF828BAf73CCb049345eF248" target="_blank">0xf22cbF25deEeA36FFF828BAf73CCb049345eF248</a></div>
        <div class="contract-chip-net">⚡ FSL Master Deployer</div>
      </div>
    </div>
  </div>

  <div class="card full-width">
    <div class="card-header">
      <div>
        <div class="card-title">🤖 FSL Agent Council — 12 Agents</div>
        <div class="card-sub">Auto-execute · Chained outputs · Telegram logging · No human input required</div>
      </div>
      <span class="badge live">AUTO-EXECUTE</span>
    </div>
    <div class="agent-grid">
      <div class="agent-chip" onclick="openAgent('system-architect')"><span class="dot green"></span>System Architect</div>
      <div class="agent-chip" onclick="openAgent('audit')"><span class="dot green"></span>Audit</div>
      <div class="agent-chip" onclick="openAgent('backend-build')"><span class="dot green"></span>Backend Build</div>
      <div class="agent-chip" onclick="openAgent('frontend-ui')"><span class="dot green"></span>Frontend / UI</div>
      <div class="agent-chip" onclick="openAgent('smart-contract')"><span class="dot green"></span>Smart Contract</div>
      <div class="agent-chip" onclick="openAgent('database')"><span class="dot green"></span>Database</div>
      <div class="agent-chip" onclick="openAgent('compliance')"><span class="dot green"></span>Compliance</div>
      <div class="agent-chip" onclick="openAgent('security')"><span class="dot green"></span>Security</div>
      <div class="agent-chip" onclick="openAgent('testing-qa')"><span class="dot green"></span>Testing / QA</div>
      <div class="agent-chip" onclick="openAgent('documentation')"><span class="dot green"></span>Documentation</div>
      <div class="agent-chip" onclick="openAgent('approval-gate')"><span class="dot green"></span>Approval Gate</div>
      <div class="agent-chip" onclick="openAgent('backup-sync')"><span class="dot green"></span>Backup / Sync</div>
    </div>
    <div class="stat-row">
      <div class="stat"><div class="stat-num">3</div><div class="stat-label">Games Built</div></div>
      <div class="stat"><div class="stat-num">5</div><div class="stat-label">Contracts Live</div></div>
      <div class="stat"><div class="stat-num">8</div><div class="stat-label">Open Source PRs</div></div>
      <div class="stat"><div class="stat-num">4</div><div class="stat-label">Ecosystems</div></div>
    </div>
  </div>

</div>


<div class="modal-overlay" id="agent-modal" onclick="closeAgentModal(event)">
  <div class="modal">
    <button class="modal-close" onclick="closeModal()">ESC</button>
    <div class="modal-agent-name" id="modal-name"></div>
    <div class="modal-tier" id="modal-tier"></div>
    <div class="modal-section-label">Skills</div>
    <div class="modal-skills" id="modal-skills"></div>
    <div class="modal-section-label">Responsibilities</div>
    <ul class="modal-responsibilities" id="modal-resp"></ul>
  </div>
</div>

<div class="proj-modal-overlay" id="proj-modal" onclick="closeProjModal(event)">
  <div class="proj-modal">
    <button class="proj-modal-close" onclick="closeProjModal(null, true)">ESC</button>
    <div class="proj-modal-title" id="proj-modal-title"></div>
    <div class="proj-modal-summary" id="proj-modal-summary"></div>
    <div class="proj-section-label">Completed</div>
    <ul class="proj-check-list done" id="proj-modal-done"></ul>
    <div class="proj-section-label">Next Steps</div>
    <ul class="proj-check-list next" id="proj-modal-next"></ul>
    <div class="proj-section-label">Links</div>
    <div class="proj-links" id="proj-modal-links"></div>
  </div>
</div>
<footer>FSL · Future Systems Lab · Where Mental Wellness Meets Metaverse · Rights Reserved, Unlicensed<div style="text-align:center;font-size:10px;color:#ffffff22;margin-top:8px;">Patent Pending — U.S. Provisional Application No. 64/063,037</div></footer>

<script>
  function updateClock() {
    const now = new Date()
    const t = now.toUTCString()
    const parts = t.split(' ')
    document.getElementById('clock').textContent = parts[4]
    document.getElementById('dateline').textContent = `${parts[0]} ${parts[1]} ${parts[2]} ${parts[3]} UTC`
  }
  updateClock()
  setInterval(updateClock, 1000)
</script>
<script>
  const AGENTS = {
    'system-architect': {
      name: 'System Architect',
      tier: 'TIER 1 — AUTO-APPROVE · ORCHESTRATION LAYER',
      skills: ['FSL Architecture','Monorepo Structure','Build Order','Phase Planning','Cross-system Integration'],
      responsibilities: [
        'Owns the canonical 19-step EncryptAI build order',
        'Designs cross-system integration patterns between HypnoNeuro, EncryptHealth, ClaimChain, and Watch',
        'Reviews all architectural decisions before implementation agents proceed',
        'Maintains CLAUDE.md and BUILD_LOG.md as source of truth',
        'Resolves conflicts between agent outputs at the system level'
      ]
    },
    'audit': {
      name: 'Audit',
      tier: 'TIER 1 — READ-ONLY · MANDATORY PRE-WRITE',
      skills: ['Git Diff Analysis','Branch Verification','Placeholder Detection','Regression Check','Credential Scan'],
      responsibilities: [
        'Runs mandatory read-only audit before any write operation',
        'Verifies correct git branch and clean working tree',
        'Confirms all placeholders replaced with real values',
        'Scans for regressed code patterns from previous steps',
        'Outputs AUDIT_REPORT.md — build halts if audit fails'
      ]
    },
    'backend-build': {
      name: 'Backend Build',
      tier: 'TIER 2 — APPROVAL-GATED · BUILD LAYER',
      skills: ['Node.js','Express','REST API','PostgreSQL','Web3.py','Sepolia RPC'],
      responsibilities: [
        'Builds and maintains all Node.js/Express API services',
        'Implements health records API for EncryptHealth Step 3',
        'Manages Infura RPC connections to Sepolia testnet',
        'Writes blockchain anchoring logic for on-chain health records',
        'Coordinates with Database agent on schema and query layer'
      ]
    },
    'frontend-ui': {
      name: 'Frontend / UI',
      tier: 'TIER 2 — APPROVAL-GATED · BUILD LAYER',
      skills: ['Next.js','React','Tailwind','wagmi','viem','FSL Brand System'],
      responsibilities: [
        'Builds all Next.js/React frontend components across FSL products',
        'Enforces FSL brand: HypnoNeuro aqua/mint, EncryptHealth FSL blue',
        'Implements MetaMask wallet connection via wagmi + injected() connector',
        'Deploys all frontends to Vercel with production aliases',
        'Owns HypnoNeuro game UI and all HypnoNeuro game interfaces'
      ]
    },
    'smart-contract': {
      name: 'Smart Contract',
      tier: 'TIER 2 — APPROVAL-GATED · BUILD LAYER',
      skills: ['Solidity','Hardhat','OpenZeppelin','ERC-20','ERC-721','Sepolia'],
      responsibilities: [
        'Writes and deploys all FSL Solidity contracts to Sepolia',
        'Maintains canonical contract addresses across all 5 deployed contracts',
        'Implements HNT/EHT token logic and MindMasteryNFT (L1–L3)',
        'Manages ClaimChain sovereign governance contract',
        'Verifies all contracts on Blockscout after deployment'
      ]
    },
    'database': {
      name: 'Database',
      tier: 'TIER 2 — APPROVAL-GATED · BUILD LAYER',
      skills: ['PostgreSQL','Schema Design','SQL','Migration Scripts','FHIR Alignment'],
      responsibilities: [
        'Owns all PostgreSQL schema design across FSL systems',
        'Maintains clawdbot_archive DB with three-table structure',
        'Writes schema.sql and lifecycle_extension.sql for ClaimChain',
        'Ensures no placeholder IDs — real patient/provider records tracked',
        'Coordinates schema merges between ClaimChain and EncryptHealth'
      ]
    },
    'compliance': {
      name: 'Compliance',
      tier: 'TIER 1 — AUTO-APPROVE · OVERSIGHT LAYER',
      skills: ['Digital Health Compliance','Web3 Governance','FHIR','Sovereign Health Law','Disclaimer Language'],
      responsibilities: [
        'Ensures neutral clinical terminology throughout all FSL products',
        'Frames all health protocols around neurotransmitter systems, not diagnoses',
        'Reviews all patient-facing copy for educational disclaimer compliance',
        'Maintains ClaimChain as sovereign health governance (not medical/insurance)',
        'Flags any agent output that introduces diagnostic or pharmaceutical framing'
      ]
    },
    'security': {
      name: 'Security',
      tier: 'TIER 1 — AUTO-APPROVE · OVERSIGHT LAYER',
      skills: ['Credential Scanning','Private Key Safety','VPN Policy','Repo Visibility','Smart Contract Audit'],
      responsibilities: [
        'Scans all commits for exposed credentials, keys, or tokens',
        'Enforces Rights Reserved, Unlicensed on all code files',
        'Monitors private repo policy — ClawdBot never public',
        'Reviews smart contract logic for common Solidity vulnerabilities',
        'Ensures deployer wallet private key never appears in any file or log'
      ]
    },
    'testing-qa': {
      name: 'Testing / QA',
      tier: 'TIER 2 — APPROVAL-GATED · BUILD LAYER',
      skills: ['Hardhat Tests','API Testing','End-to-End','Contract Verification','Regression Testing'],
      responsibilities: [
        'Writes Hardhat test suites for all smart contracts before mainnet consideration',
        'Runs API endpoint tests after each Backend Build agent deployment',
        'Verifies MetaMask connection flow across all supported browsers',
        'Tests all HypnoNeuro games for functional completion',
        'Blocks deployment if any test suite fails — reports to Approval Gate'
      ]
    },
    'documentation': {
      name: 'Documentation',
      tier: 'TIER 1 — AUTO-APPROVE · SUPPORT LAYER',
      skills: ['README Writing','BUILD_LOG','API Docs','DEng Framing','GitHub Profile'],
      responsibilities: [
        'Maintains BUILD_LOG.md after every completed step',
        'Writes and updates all GitHub README files per NeuroBalance Watch template',
        'Documents all API endpoints with real values — no placeholders',
        'Frames FSL build artifacts for ASU DEng applied project documentation',
        'Keeps FSL GitHub profile README and CV page current'
      ]
    },
    'approval-gate': {
      name: 'Approval Gate',
      tier: 'TIER 1 — HUMAN-IN-LOOP · CONTROL LAYER',
      skills: ['Telegram Bot','Approve/Deny/Defer','Case-insensitive Parsing','Audit Trail','Build Halt'],
      responsibilities: [
        'Intercepts all Tier 2 agent actions before file writes',
        'Sends approval requests to Telegram bot FSL_Agent_Gateway_Bot',
        'Accepts case-insensitive approve / deny / defer commands',
        'Logs all decisions to clawdbot_archive PostgreSQL DB',
        'Halts build pipeline on deny — resumes on next approve signal'
      ]
    },
    'backup-sync': {
      name: 'Backup / Sync',
      tier: 'TIER 1 — AUTO-APPROVE · INFRASTRUCTURE LAYER',
      skills: ['Git Push','BackupArchiveContract','Sepolia Anchoring','Cron Jobs','Output Archival'],
      responsibilities: [
        'Auto-pushes all agent outputs to backup-archive repo after approval',
        'Anchors build milestones to BackupArchiveContract on Sepolia',
        'Runs daily summary cron at 3:33 AM UTC via clawdbot-campaign.service',
        'Syncs Command Center HTML to VPS nginx on every deploy',
        'Maintains output history in PostgreSQL archive table'
      ]
    }
  };

  function openAgent(id) {
    const a = AGENTS[id];
    if (!a) return;
    document.getElementById('modal-name').textContent = a.name;
    document.getElementById('modal-tier').textContent = a.tier;
    document.getElementById('modal-skills').innerHTML = a.skills.map(s => `<span class="skill-tag">${s}</span>`).join('');
    document.getElementById('modal-resp').innerHTML = a.responsibilities.map(r => `<li>${r}</li>`).join('');
    document.getElementById('agent-modal').classList.add('open');
  }
  function closeModal() { document.getElementById('agent-modal').classList.remove('open'); }
  function closeAgentModal(e) { if (e.target.id === 'agent-modal') closeModal(); }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
</script>
<script>
let FSL_STATUS = null;
fetch('status.json').then(r => r.json()).then(d => { FSL_STATUS = d; }).catch(() => {});
function openProj(id) {
  if (!FSL_STATUS) { alert('Status loading, try again.'); return; }
  const p = FSL_STATUS.projects[id];
  if (!p) return;
  document.getElementById('proj-modal-title').textContent = p.title;
  document.getElementById('proj-modal-summary').textContent = p.summary;
  document.getElementById('proj-modal-done').innerHTML = p.completed.map(c => '<li>' + c + '</li>').join('');
  document.getElementById('proj-modal-next').innerHTML = p.next.map(n => '<li>' + n + '</li>').join('');
  document.getElementById('proj-modal-links').innerHTML = p.links.map(l => '<a href="' + l.url + '" target="_blank" class="proj-link">' + l.label + '</a>').join('');
  document.getElementById('proj-modal').classList.add('open');
}
function closeProjModal(e, force) {
  if (force || (e && e.target.id === 'proj-modal')) document.getElementById('proj-modal').classList.remove('open');
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeProjModal(null, true); });
</script>
<script src="ticker.js"></script></body>
</html>

=== QUICK CHECKS ===
Patent 64/063,037: 1 matches
Trademark 99533250: 0 matches
Contract count: 14 addresses
Phase 1: 1 matches
Backup/restore: 3 matches
SSL/cert: 0 matches
PM2: 0 matches
BenevolenceFund: 0 matches
