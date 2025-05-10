const fs = require('fs');
const path = require('path');

// Define the path to the ABI file
const abiFilePath = path.join(__dirname, 'frontend', 'src', 'abis', 'AIAgentNFT.json');

// Read and parse the ABI data
const abiData = fs.readFileSync(abiFilePath, 'utf8');
const parsedData = JSON.parse(abiData);

// Access the abi property
const abi = parsedData.abi;

// Log the structure of the ABI
console.log("ABI Structure:", abi);

// Check if 'abi' is an array and contains the 'mint' function
if (Array.isArray(abi)) {
    const hasMint = abi.some(item => item.name === 'mint' && item.type === 'function');
    if (hasMint) {
        console.log('The mint function is present in the ABI.');
    } else {
        console.log('The mint function is not present in the ABI.');
    }
} else {
    console.error('ABI is not in an array format. Here is the structure:', abi);
}
