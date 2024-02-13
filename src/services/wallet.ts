import express from 'express';
import {parseFrameRequest, createWalletFrame, errorFrame} from '../lib/farcaster';
import { getOwnerAddressFromFid } from '../lib/farcaster';
import { createOrFindSmartWalletForFid } from '../lib/smart-wallet';

const router = express.Router();

router.post('/wallet', async (req, res) => {
    let frameRequest;
    // Parse and validate request from Frame for fid
    try {
        frameRequest = req.body;
        if (!frameRequest) throw new Error('Could not deserialize request from frame');
    } catch {
        return res.send(errorFrame);
    }
    const {fid, isValid} = await parseFrameRequest(frameRequest);
    if (!fid || !isValid) return res.send(errorFrame);
    // Query FC Registry contract to get owner address from fid
    const ownerAddress = await getOwnerAddressFromFid(fid);
    if (!ownerAddress) return res.send(errorFrame);

    // Generate a smart wallet associated with the fid
    const smartWalletAddress = await createOrFindSmartWalletForFid(fid, ownerAddress);
    if (!smartWalletAddress) return res.send(errorFrame);

    return res.send(createWalletFrame(smartWalletAddress));
});

export default router;
