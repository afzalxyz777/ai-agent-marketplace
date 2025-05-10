// frontend/src/app/page.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { AIAgentNFT_ADDRESS, AIAgentNFT_ABI } from '@/constants/AIAgentNFT'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

const MintingPage = () => {
  const { address, isConnected } = useAccount()
  const [minting, setMinting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log('AIAgentNFT_ABI', AIAgentNFT_ABI)
    console.log('AIAgentNFT_ADDRESS', AIAgentNFT_ADDRESS)

    if (!AIAgentNFT_ABI || !Array.isArray(AIAgentNFT_ABI)) {
      setError('Contract ABI is invalid')
    }
    if (!AIAgentNFT_ADDRESS) {
      setError('Contract address is missing')
    }
  }, [])

  const mintNFT = async () => {
    setMinting(true)
    setSuccess(null)
    setError(null)

    try {
      if (!AIAgentNFT_ABI || !Array.isArray(AIAgentNFT_ABI)) {
        throw new Error('Invalid contract ABI')
      }
      if (!AIAgentNFT_ADDRESS) {
        throw new Error('Contract address is missing')
      }

      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask or another Ethereum provider is required')
      }

      const provider = new ethers.BrowserProvider(window.ethereum as any)
      const signer = await provider.getSigner()
      const network = await provider.getNetwork()

      const chainId = Number(network.chainId)
      if (chainId !== 31337) {
        throw new Error(`Please switch to the local Anvil network (chainId 31337). Current: ${chainId}`)
      }

      const contract = new ethers.Contract(AIAgentNFT_ADDRESS, AIAgentNFT_ABI, signer)

      const tx = await contract.mint()
      console.log("Transaction:", tx)

      const receipt = await tx.wait()
      console.log("Receipt:", receipt)

      setSuccess(`Minted! Tx Hash: ${receipt.hash}`)
    } catch (err: any) {
      console.error("Minting error:", err)
      setError(String(err?.message || 'Transaction failed'))
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
