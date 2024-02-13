import express from 'express';
import {parseFrameRequest, errorFrame, createSuccessFrame} from '../lib/farcaster';
import {airdropTo, getOwnerNFTFromFid} from '../lib/nft';

const router = express.Router();
router.post('/mint/:address', async (req, res) => {
    let frameRequest;
    // Parse and validate request from Frame for fid
    try {
        frameRequest = req.body;
        if (!frameRequest) throw new Error('Could not deserialize request from frame');
    } catch (e) {
        return res.status(400).send(errorFrame);
    }

    const {fid, isValid} = await parseFrameRequest(frameRequest);
    if (!fid || !isValid) return res.status(400).send(errorFrame);
    
    const address = req.params.address;
    if (typeof address !== 'string') return res.status(400).send(errorFrame);
    const isAllowed = await getOwnerNFTFromFid(address as `0x${string}`);
    if(!isAllowed) return res.status(400).send(createSuccessFrame(address));
    // Airdrop NFT to the user's wallet
    const tx = await airdropTo(address, fid);
    if (!tx) return res.status(400).send(errorFrame);

    return res.send(createSuccessFrame(address));
});

export default router;
