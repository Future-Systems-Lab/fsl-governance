/**
 * Playwright window.ethereum mock fixture
 *
 * Injects a mock EIP-1193 provider that signs with a test wallet's private key.
 * Use via page.addInitScript() before navigating to session page.
 *
 * Usage:
 *   const { walletMockScript } = require('./wallet-mock');
 *   await page.addInitScript(walletMockScript(privateKey, address, chainId));
 */

function walletMockScript(privateKey, address, chainId = '0xaa36a7') {
  // This runs in the browser context — no Node.js imports available.
  // We implement minimal EIP-191 signing using the injected ethers UMD bundle.
  return `
    (function() {
      const MOCK_ADDRESS = '${address}';
      const MOCK_PRIVATE_KEY = '${privateKey}';
      const MOCK_CHAIN_ID = '${chainId}';
      let connected = false;

      // Wait for ethers to load (from CDN in session.html)
      function waitForEthers(cb) {
        if (typeof ethers !== 'undefined') return cb();
        const observer = new MutationObserver(() => {
          if (typeof ethers !== 'undefined') { observer.disconnect(); cb(); }
        });
        observer.observe(document, { childList: true, subtree: true });
        // Fallback timeout
        setTimeout(() => { observer.disconnect(); cb(); }, 5000);
      }

      window.ethereum = {
        isConnected: () => connected,
        isBraveWallet: false,
        isMock: true,
        chainId: MOCK_CHAIN_ID,
        selectedAddress: null,

        request: async function({ method, params }) {
          switch (method) {
            case 'eth_requestAccounts':
              connected = true;
              window.ethereum.selectedAddress = MOCK_ADDRESS;
              return [MOCK_ADDRESS];

            case 'eth_accounts':
              return connected ? [MOCK_ADDRESS] : [];

            case 'eth_chainId':
              return MOCK_CHAIN_ID;

            case 'wallet_switchEthereumChain':
              return null;

            case 'wallet_addEthereumChain':
              return null;

            case 'personal_sign': {
              const message = params[0];
              // Use ethers from the page's CDN bundle
              return new Promise((resolve, reject) => {
                waitForEthers(() => {
                  try {
                    const wallet = new ethers.Wallet(MOCK_PRIVATE_KEY);
                    // personal_sign: first param is message (hex or utf8), second is address
                    let msgToSign = message;
                    if (message.startsWith('0x')) {
                      msgToSign = ethers.toUtf8String(message);
                    }
                    wallet.signMessage(msgToSign).then(resolve).catch(reject);
                  } catch(e) { reject(e); }
                });
              });
            }

            case 'eth_sendTransaction': {
              // Mock tx — return fake hash. On-chain attestation won't actually execute
              // but the UI flow will complete. Real attestation tested separately.
              return '0x' + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('');
            }

            case 'net_version':
              return '11155111';

            default:
              console.warn('[wallet-mock] Unhandled method:', method);
              throw new Error('Method not supported: ' + method);
          }
        },

        on: function(event, handler) {
          // Stub event listeners
          if (event === 'accountsChanged' && connected) {
            setTimeout(() => handler([MOCK_ADDRESS]), 0);
          }
          return this;
        },

        removeListener: function() { return this; },
        removeAllListeners: function() { return this; }
      };

      // Dispatch EIP-6963 provider info for detection
      window.dispatchEvent(new CustomEvent('eip6963:announceProvider', {
        detail: {
          info: { uuid: 'mock-test-wallet', name: 'Test Wallet', icon: '' },
          provider: window.ethereum
        }
      }));
    })();
  `;
}

module.exports = { walletMockScript };
