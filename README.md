# Emerald issue with reverting within calls

This repo contains test files to reproduce an issue that came up when inplementing a fee based token on the Oasis Emerald chain.
When using eth_estimateGas we expect the estimation to fail if it is reverted. As this repo shows this is currently not the case on Emerald.

Expected behavior run on hardhat network.

![Expected behavior](/assets/expected.png)

Behavior on Emerald testnet.

![Expected behavior](/assets/emerald.png)

# Reproduce

- Run `npm i`

- Enter your testnet private key in the .env.example file and rename the file to .env

- See the behavior of the local hardhat evm `npm run test`

- See the issue on emerald testnet `npm run test:emerald`
