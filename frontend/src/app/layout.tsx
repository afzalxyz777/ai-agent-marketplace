'use client';

import React from 'react';
import { WagmiProvider } from 'wagmi';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { sepolia, hardhat } from 'wagmi/chains'; // Import chains from wagmi
import { http } from 'viem';
import '@rainbow-me/rainbowkit/styles.css';

// 1) Create a React Query client
const queryClient = new QueryClient();

// 2) Build the Wagmi/RainbowKit config via RainbowKit’s helper
const wagmiConfig = getDefaultConfig({
  appName: 'AI Agent Marketplace',
  projectId: 'c93ee7234024b8bb03caae32278de8c5', // your WalletConnect Project ID
  chains: [sepolia, hardhat], // Chains are passed here
  transports: {
    [sepolia.id]: http(),
    [hardhat.id]: http(),
  },
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={wagmiConfig}>
            {/* RainbowKitProvider does not need the chains prop anymore */}
            <RainbowKitProvider>
              {children}
            </RainbowKitProvider>
          </WagmiProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
