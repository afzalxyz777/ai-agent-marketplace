// frontend/src/app/mint/page.tsx
'use client'

import React, { useState } from 'react'
import { ethers } from 'ethers'
import { AIAgentNFT_ADDRESS, AIAgentNFT_ABI } from '@/constants/AIAgentNFT'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

const MintingPage = () => {
  const { address, isConnected } = useAccount()
  const [minting, setMinting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const mintNFT = async () => {
    setMinting(true)
    setSuccess(null)
    setError(null)

    try {
      if (!window.ethereum) {
        throw new Error('MetaMask or another Ethereum provider is required')
      }

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const network = await provider.getNetwork()
      const chainId = Number(network.chainId)

      // Allow both Sepolia and local network
      if (chainId !== 11155111 && chainId !== 31337) {
        throw new Error(`Please switch to Sepolia or local network. Current: ${chainId}`)
      }

      const contract = new ethers.Contract(AIAgentNFT_ADDRESS, AIAgentNFT_ABI, signer)
      const tx = await contract.mint()
      console.log("Transaction sent:", tx.hash)
      
      const receipt = await tx.wait()
      console.log("Transaction confirmed:", receipt)
      
      setSuccess(`Successfully minted! Transaction: ${receipt.hash}`)
    } catch (err: any) {
      console.error("Minting error:", err)
      setError(err?.message || 'Transaction failed')
    } finally {
      setMinting(false)
    }
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Mint Your AI Agent NFT</h1>

      {!isConnected ? (
        <div className="mb-6 p-4 bg-gray-100 rounded-lg text-center">
          <ConnectButton />
          <p className="mt-3">Connect your wallet to mint NFTs</p>
        </div>
      ) : (
        <button
          onClick={mintNFT}
          disabled={minting}
          className={`w-full py-3 px-4 rounded text-white font-semibold transition ${
            minting ? 'bg-gray-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {minting ? 'Minting...' : 'Mint NFT'}
        </button>
      )}

      {success && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
          ✅ {success}
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded">
          ❌ {error}
        </div>
      )}
    </main>
  )
}

export default MintingPage