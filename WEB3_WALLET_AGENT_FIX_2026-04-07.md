# Web3 Wallet Agent — Fix Recommendations
**Date:** 2026-04-07
**Agent:** web3_wallet_agent
**Model:** claude-opus-4

---

## DEFINITIVE FIXES

### 1. MetaMask Phishing Warning

**Reality Check**: You CANNOT bypass MetaMask's phishing warning programmatically. This is a security feature.

**Immediate Solution - User Instructions Modal**:

```typescript
// app/components/MetaMaskWarningModal.tsx
'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export function MetaMaskWarningModal() {
  const [show, setShow] = useState(false);
  const { connector } = useAccount();
  
  useEffect(() => {
    const isMetaMaskMobile = connector?.id === 'injected' && 
      /Android|iPhone/i.test(navigator.userAgent) &&
      window.ethereum?.isMetaMask;
      
    if (isMetaMaskMobile) {
      setShow(true);
    }
  }, [connector]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-bold mb-4">MetaMask Security Notice</h2>
        <p className="mb-4">
          MetaMask may show a warning about our site. This is a false positive 
          we're working to resolve.
        </p>
        <div className="bg-yellow-50 p-4 rounded mb-4">
          <p className="font-semibold mb-2">To proceed:</p>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Click "Proceed anyway" on the MetaMask warning</li>
            <li>Confirm the connection request</li>
            <li>You'll be redirected to your dashboard</li>
          </ol>
        </div>
        <button 
          onClick={() => setShow(false)}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          I Understand
        </button>
      </div>
    </div>
  );
}
```

### 2. WalletConnect Fix - Use Web3Modal v3

**Install**:
```bash
npm install @web3modal/wagmi@3.5.0 @web3modal/ethereum@3.5.0
```

**Implementation**:
```typescript
// app/providers/Web3Provider.tsx
'use client';

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { WagmiConfig } from 'wagmi';
import { mainnet, polygon } from 'viem/chains';

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID!;

const metadata = {
  name: 'EncryptHealth',
  description: 'Secure Health Platform',
  url: 'https://encrypthealth.io',
  icons: ['https://encrypthealth.io/icon.png']
};

const chains = [mainnet, polygon] as const;

const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  enableWalletConnect: true,
  enableInjected: true,
  enableEIP6963: true,
  enableCoinbase: false,
});

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeMode: 'light',
  themeVariables: {
    '--w3m-accent': '#2563eb',
  }
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
```

### 3. Redirect Loop Fix - Proper State Management

**The Core Issue**: wagmi v2 state updates are asynchronous. Using `window.location.href` during a React render causes race conditions.

**Solution**:
```typescript
// app/components/ConnectButton.tsx
'use client';

import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useSignMessage, useDisconnect } from 'wagmi';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export function ConnectButton() {
  const { open } = useWeb3Modal();
  const { address, isConnected, status } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const hasTriedAuth = useRef(false);

  useEffect(() => {
    async function handleAuth() {
      // Prevent multiple auth attempts
      if (hasTriedAuth.current || !isConnected || !address || status !== 'connected') {
        return;
      }

      hasTriedAuth.current = true;

      try {
        // Generate nonce from server
        const nonceRes = await fetch('/api/auth/nonce', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ address })
        });
        
        const { nonce } = await nonceRes.json();
        
        // Sign message
        const message = `Sign this message to authenticate with EncryptHealth.\n\nNonce: ${nonce}`;
        const signature = await signMessageAsync({ message });
        
        // Verify signature
        const authRes = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ address, signature, nonce })
        });
        
        if (authRes.ok) {
          const { token } = await authRes.json();
          
          // Store auth token
          document.cookie = `auth-token=${token}; path=/; secure; samesite=strict`;
          
          // Use Next.js router for navigation
          router.push('/dashboard');
        } else {
          throw new Error('Authentication failed');
        }
      } catch (error) {
        console.error('Auth error:', error);
        hasTriedAuth.current = false;
        disconnect();
      }
    }

    handleAuth();
  }, [isConnected, address, status, signMessageAsync, disconnect, router]);

  // Reset auth flag on disconnect
  useEffect(() => {
    if (!isConnected) {
      hasTriedAuth.current = false;
    }
  }, [isConnected]);

  if (isConnected) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
        <button 
          onClick={() => disconnect()}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => open()}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium"
    >
      Connect Wallet
    </button>
  );
}
```

### 4. Dashboard Protection Middleware

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const protectedRoutes = ['/dashboard'];
const authRoutes = ['/login', '/'];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const { pathname } = request.nextUrl;
  
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.includes(pathname);

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && isAuthRoute) {
    try {
      // Verify token
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      await jwtVerify(token, secret);
      
      // Redirect authenticated users away from auth pages
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } catch {
      // Invalid token, clear it
      const response = NextResponse.next();
      response.cookies.delete('auth-token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
```

### 5. Complete Layout Structure

```typescript
// app/layout.tsx
import { Web3Provider } from './providers/Web3Provider';
import { MetaMaskWarningModal } from './components/MetaMaskWarningModal';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Web3Provider>
          <MetaMaskWarningModal />
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
```

### 6. Environment Variables (Vercel)

```env
NEXT_PUBLIC_WC_PROJECT_ID=your_project_id_here
JWT_SECRET=your_secret_key_here
```

## Key Points:

1. **MetaMask Warning**: Cannot be bypassed. Show user instructions.
2. **WalletConnect**: Use Web3Modal v3 for reliable mobile support.
3. **Redirect Loop**: Use Next.js router + proper effect dependencies + auth token verification.
4. **State Management**: Track auth attempts with useRef to prevent loops.
5. **Middleware**: Protect routes at edge, not in components.

This implementation eliminates race conditions and provides a smooth mobile wallet experience while you wait for MetaMask phishing list removal.