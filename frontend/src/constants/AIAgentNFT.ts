// src/constants/AIAgentNFT.ts
import AIAgentNFTJson from '@/abis/AIAgentNFT.json';
// Define the shape of the contract data
interface ContractJson {
  abi: any[];
  networks?: Record<string, { address: string }>;
  bytecode?: string;
}

// Safely assert the JSON data is correct
const contractData = AIAgentNFTJson as ContractJson;

// Use the environment variable or fallback to a default address
export const AIAgentNFT_ADDRESS =
  process.env.NEXT_PUBLIC_AGENT_NFT_ADDRESS ||
  '0x1CfD8455F189c56a4FBd81EB7D4118DB04616BA8';

// Export the ABI
export const AIAgentNFT_ABI = contractData.abi;
