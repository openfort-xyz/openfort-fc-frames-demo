# Openfort x Frames Demo

This is an example [Farcaster](https://www.farcaster.xyz/) [**Frame**](https://docs.farcaster.xyz/learn/what-is-farcaster/frames) to demonstrate how you can use Frames alongside Openfort's [**accounts**](https://www.openfort.xyz/docs/guides/accounts) feature to create novel experiences for your users.

When a user first sees this demo Frame in their Farcaster client, they can click a button to redeem a testnet NFT. Behind the scenes, Openfort creates an smart wallet with the current Farcaster user and airdrops an NFT to it. Users can view their NFT by visiting any explorerwith their new smart account address. This is a **testnet NFT** on the Base Sepolia testnet.

This app is built with [ExpressJs](https://expressjs.com/), and makes uses of libraries like [`@coinbase/onchainkit`](https://github.com/coinbase/onchainkit), [`@farcaster/hub-node-js`](https://github.com/farcasterxyz/hub-monorepo/tree/main/packages/hub-nodejs), and [`viem`](https://viem.sh/) for interacting with the blockchain and the [Farcaster](https://www.farcaster.xyz/) protocol. 

## Live Demo

To see this demo in action, share [`https://openfort-frames-demo.onrender.com`](https://openfort-frames-demo.onrender.com) in any Farcaster client that supports Frames (e.g. Warpcast) and interact with it. You can then go to any explorer with your new address to view your NFT. 

## Setup

1. Fork this repository, clone it, and open it in your command line:

```sh
git clone https://github.com/<your-github-handle>/openfort-frames-demo
```

2. Install the necessary dependencies using your preferred package manager:

```sh
npm i 
```

3. Using a fresh development wallet, deploy an ERC-721 contract at to the Base Sepolia testnet. **Do not use a real wallet, as you must store the development wallet's seed phrase as an environment secret.** You can use a tool like [Remix](https://remix.ethereum.org/) or [`hardhat`](https://www.npmjs.com/package/hardhat) to deploy your contract.

4. Initialize your environment variables by copying the contents of `.env.example` to a new `.env` file, and fill in the required values. You'll need to set a base URL, your contract ID, policy ID, developer account ID, and your Openfort API key. 

5. Import the contract:  Checkout the [guide](https://www.openfort.xyz/docs/guides/transaction-cloud/policies/strategies).

6. Create a Policy to sponsor the transactions:  Checkout the [guide](https://www.openfort.xyz/docs/guides/transaction-cloud/policies/strategies). For this demo, you must include two policy rules. One of type 'account_functions' to allow for smart contract deployment, and another rule of type 'contract_functions' to allow sponsoring the mint gaslessly.

7. Creating a Developer Account to mint the assets: Checkout the [guide](https://www.openfort.xyz/docs/guides/accounts/dev/minting-account).

```sh
NEXT_PUBLIC_BASE_URL=<insert-the-url-for-your-frame>
CONTRACT_ID=<insert-your-contract-id>
POLICY_ID=<insert-your-policy-id>
DEVELOPER_ACCOUNT_ID=<insert-your-developer-account-id>
OPENFORT_API_KEY=<insert-your-openfort-api-secret>
```

**That's it!** To run the demo locally, execute `npm run dev` and open [http://localhost:3000](http://localhost:3000).

## Testing the frame

You can test this Frame using [Warpcast Embed Tools](https://warpcast.com/~/developers/frames) to preview the frame interaction. Please note that a `localhost` URL will not work with Warpcast Embed Tools, so you should set up a public tunnel to your local app using a tool like [`ngrok`](https://ngrok.com/) or [Cloudflare](https://www.cloudflare.com/products/tunnel/). 

## Check out
- `src/lib/smart-wallet.ts` to see how to use Openfort to pre-generate smart wallets for a user's Farcaster accounts
- `src/lib/farcaster.ts` to see how Frames are generated and how to verify a user's Farcaster account and query the protocol for their Farcaster data
- `src/lib/nft.ts` to see how to airdrop the ERC-721 you deployed to a user's wallet address
- `src/services/wallet.ts` to see how the first Frame interaction generates an embedded wallet for the user
- `src/services/mint.ts` to see how the second Frame interaction airdrops an NFT to the user
- `contracts/src/OpenfortFrameNFT.sol` for the sample contract used.
