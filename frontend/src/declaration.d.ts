// src/declarations.d.ts
declare module '*.json' {
    const value: any;
    export default value;
  }
  // contracts-json.d.ts
declare module "@/abis/aiagentnft.json" {
    interface ContractJson {
      abi: any[];
      networks?: Record<string, { address: string }>;
      bytecode?: string;
    }
    const value: ContractJson;
    export default value;
  }
  