// app/page.tsx
'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  const [networkError, setNetworkError] = useState<string | null>(null);

  // Detect and handle network selection
  useEffect(() => {
    const switchNetwork = async () => {
      if (!window.ethereum) return;
      
      try {
        const chainId = await window.ethereum.request({ method: "eth_chainId" });
        // Sepolia chainId is 0xaa36a7 or 11155111 in decimal
        // Local development chainId is 0x7a69 or 31337 in decimal
        if (chainId !== "0xaa36a7" && chainId !== "0x7a69") {
          try {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0xaa36a7" }], // Switch to Sepolia
            });
          } catch (switchError: any) {
            // This error code indicates that the chain has not been added to MetaMask
            if (switchError.code === 4902) {
              try {
                await window.ethereum.request({
                  method: "wallet_addEthereumChain",
                  params: [
                    {
                      chainId: "0xaa36a7",
                      chainName: "Sepolia Test Network",
                      nativeCurrency: {
                        name: "Sepolia ETH",
                        symbol: "ETH",
                        decimals: 18
                      },
                      rpcUrls: ["https://sepolia.infura.io/v3/"],
                      blockExplorerUrls: ["https://sepolia.etherscan.io"]
                    },
                  ],
                });
              } catch (addError) {
                console.error("Failed to add Sepolia network:", addError);
                setNetworkError("Failed to add Sepolia network. Please add it manually in your wallet.");
              }
            } else {
              console.error("Failed to switch network:", switchError);
              setNetworkError("Failed to switch to Sepolia network. Please switch manually in your wallet.");
            }
          }
        }
      } catch (error) {
        console.error("Network detection error:", error);
      }
    };

    if (window.ethereum) {
      switchNetwork();
      
      // Listen for network changes
      window.ethereum.on('chainChanged', () => {
        switchNetwork();
      });
    }
    
    return () => {
      // Clean up event listener
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener('chainChanged', switchNetwork);
      }
    };
  }, []);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 pb-20 gap-8 sm:p-20 font-sans">
      <header className="flex justify-between items-center mb-8">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={120}
          height={25}
          priority
        />
        <ConnectButton />
      </header>
      
      <main className="flex flex-col gap-8 items-center text-center">
        <h1 className="text-4xl font-bold mb-4">AI Agent Marketplace</h1>
        <p className="text-xl max-w-2xl mb-8">
          Mint and interact with AI-powered agent NFTs on the blockchain.
        </p>
        
        {networkError && (
          <div className="p-4 bg-red-100 text-red-800 rounded-lg mb-6 max-w-lg mx-auto">
            ⚠️ {networkError}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link
            href="/mint"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Mint an Agent
          </Link>
          <Link
            href="/dashboard"
            className="bg-gray-800 text-white px-8 py-4 rounded-lg hover:bg-gray-700 transition-colors"
          >
            View Dashboard
          </Link>
        </div>
      </main>
      
      <footer className="flex gap-6 flex-wrap items-center justify-center mt-16">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}