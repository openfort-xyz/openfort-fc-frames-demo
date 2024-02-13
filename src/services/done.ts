import express from 'express';
const router = express.Router();

router.post('/done', (req, res) => {
    // get query param from request
    const address = req.query.address;
    let website = 'https://openfort.xyz';
    // add attribute to website to know the address and they come from Farcaster
    if (address) {
        website += `?address=${address}&source=farcaster`;
    }

    res.redirect(302, website);
});

export default router;
