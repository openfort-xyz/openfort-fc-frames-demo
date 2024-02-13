import Openfort from "@openfort/openfort-node"

const CONTRACT_ID = process.env.CONTRACT_ID!;
const POLICY_ID = process.env.POLICY_ID!;
const DEVELOPER_ACCOUNT_ID = process.env.DEVELOPER_ACCOUNT_ID!;
const OPENFORT_API_KEY = process.env.OPENFORT_API_KEY!;
const openfort = new Openfort(OPENFORT_API_KEY)


export const airdropTo = async (recipient: string, fid: number) => {
    try {
        const tx = await openfort.transactionIntents.create({
            chainId: 84532,
            policy:POLICY_ID,
            account: DEVELOPER_ACCOUNT_ID,
            optimistic: true,
            interactions: [
                {
                    contract: CONTRACT_ID,
                    functionName:'mint',
                    functionArgs: [recipient, fid.toString()]
                }
            ]
        });

        return tx;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

