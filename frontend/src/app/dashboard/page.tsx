// src/app/dashboard/page.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { AIAgentNFT_ADDRESS, AIAgentNFT_ABI } from '@/constants/AIAgentNFT'
import { ethers } from 'ethers'

export default function DashboardPage() {
  const { address, isConnected } = useAccount()
  const [ownedTokens, setOwnedTokens] = useState<number[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isConnected || !address) return
    
    const fetchOwned = async () => {
      try {
        setLoading(true)
        setError(null)

        // Ensure the Web3 provider is available
        if (typeof window.ethereum === 'undefined') {
          setError('MetaMask or another Ethereum provider is required')
          return
        }

        // Create a provider connected to the user's wallet
        const provider = new ethers.BrowserProvider(window.ethereum)
        
        // Get the signer
        const signer = await provider.getSigner()
        
        // Get the network to check chain ID
        const network = await provider.getNetwork()
        const chainId = Number(network.chainId)
        
        // Check if we're on the right network (Sepolia or local dev network)
        // 11155111 is Sepolia, 31337 is Hardhat/Anvil local network
        if (chainId !== 11155111 && chainId !== 31337) {
          setError(`Please switch to the Sepolia or local development network. Current network ID: ${chainId}`)
          return
        }

        // Create the contract instance with signer to enable transactions
        const contract = new ethers.Contract(AIAgentNFT_ADDRESS, AIAgentNFT_ABI, signer)
        
        try {
          // Get the total minted tokens
          const totalMinted = await contract.nextTokenId()
          const total = Number(totalMinted) // Convert from bigint to number
          console.log("Total minted tokens:", total)
          
          const tokens: number[] = []
          
          // Check ownership for each token
          for (let i = 0; i < total; i++) {
            try {
              const owner = await contract.ownerOf(i)
              if (owner.toLowerCase() === address.toLowerCase()) {
                tokens.push(i)
              }
            } catch (err) {
              console.warn(`Error checking ownership of token ${i}:`, err)
              // Continue checking other tokens
            }
          }
          
          setOwnedTokens(tokens)
        } catch (err: any) {
          console.error("Contract interaction error:", err)
          setError(`Contract interaction error: ${String(err?.message || err || "Unknown error")}`)
        }
      } catch (err: any) {
        console.error("Dashboard error:", err)
        setError(String(err?.message || err || "An unknown error occurred"))
      } finally {
        setLoading(false)
      }
    }

    fetchOwned()
  }, [address, isConnected])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your AI-Agent NFTs</h1>
      {!isConnected ? (
        <div className="p-4 bg-gray-100 rounded-lg">
          <ConnectButton />
          <p className="mt-2">Connect your wallet to see owned tokens</p>
        </div>
      ) : loading ? (
        <div className="p-4 bg-blue-50 rounded-lg">Loading your tokens…</div>
      ) : error ? (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">Error: {error}</div>
      ) : ownedTokens.length === 0 ? (
        <div className="p-4 bg-yellow-50 rounded-lg">You don't own any tokens yet.</div>
      ) : (
        <ul className="space-y-2">
          {ownedTokens.map((tokenId) => (
            <li key={tokenId} className="p-4 bg-green-50 rounded-lg">
              Token ID: {tokenId}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}