# Blockchain-Based Academic Certificate Verification DApp

## Features
- Issue certificates on blockchain
- Verify instantly
- Tamper-proof

## Tech Stack
Solidity 0.8.19, Hardhat, Ethers.js, React, Localhost (Hardhat Network)

## How to Run
1. npm install
2. npx hardhat compile
3. npx hardhat node (keep running)
4. New terminal: npx hardhat run scripts/deploy.js --network localhost
5. Copy contract address to frontend/src/App.jsx
6. cd frontend && npm install && npm run dev

## Deployed
Network: Localhost 8545
Contract: 0x5FbDB2315678afecb367f032d93F642f64180aa3 (example)

## Screenshots in /screenshots folder