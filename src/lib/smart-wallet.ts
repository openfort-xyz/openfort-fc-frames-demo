import Openfort from "@openfort/openfort-node"

const OPENFORT_API_KEY = process.env.OPENFORT_API_KEY!;

const openfort = new Openfort(OPENFORT_API_KEY)

export const createOrFindSmartWalletForFid = async (fid: number, ownerAddress: string) => {
    const existingAddress = await findExistingSmartWalletForFid(String(fid));
    if (existingAddress) return existingAddress;

    const {address} = await createSmartWalletForFid(String(fid), ownerAddress);
    return address;
}

const createSmartWalletForFid = async (fid: string, ownerAddress: string) => {
    let smartWalletAddress: string | undefined;
    let conflictingDid: string | undefined;

    try {
        const player = await openfort.players.create({"name":fid, description: "Smart Wallet"})
        const account  = await openfort.accounts.create({player:player.id, chainId: 84532, externalOwnerAddress:ownerAddress})
        await openfort.accounts.deploy({id:player.id, policy:process.env.POLICY_ID!})

        smartWalletAddress = account ? account.address : undefined;
    } catch (e) {
        conflictingDid = (e as any).response.data.cause;
    }

    return {address: smartWalletAddress, conflictingDid: conflictingDid};
}

export const findExistingSmartWalletForFid = async (fid: string) => {
    try {
        const response = await openfort.players.list({name:fid, expand: ['accounts']})
        const accounts = response.data[0]?.accounts
        const smartWallet = accounts?.find((account:any) => account.chainId === 84532);
        return smartWallet ? smartWallet.address : undefined;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}
