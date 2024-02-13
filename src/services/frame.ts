

import { FRAME_BASE_URL, FrameImageUrls } from "../lib/farcaster";
import express from 'express';

const router = express.Router();

interface IFrameProps {
    frame?: string;
    imageUrl: string;
    buttons?: string[];
    postUrl?: string;
}

function generateFarcasterFrameMetaTag({ frame, imageUrl, postUrl, buttons }: IFrameProps): string {
    // Default to vNext
    if (!frame) {
        frame = "vNext"
    }
    // Ensure there are at most four buttons
    if (buttons && buttons.length > 4) {
        throw new Error("Maximum of four buttons are allowed per frame.");
    }

    // Generate Open Graph tags for image, redirect, and buttons
    let metaTag = `<meta property="fc:frame" content="${frame ? frame : "vNext"}" />\n`;
    metaTag += `<meta property="fc:frame:image" content="${imageUrl}" />\n`;

    if (buttons) {
        buttons.forEach((button, index) => {
            metaTag += `<meta property="fc:frame:button:${index + 1}" content="${button}" />\n`;
        });
    }

    // post URL if exists
    if (postUrl) {
        metaTag += `<meta property="fc:frame:post_url" content="${postUrl}" /> \n`
    }

    return metaTag;
}

function frameGenerator(frameProps: IFrameProps): string {

    const metaTag = generateFarcasterFrameMetaTag(frameProps);

    const html = `<!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>Openfort Frames</title>
                <meta property="og:title" content="Openfort frames quickstart" />
                <meta property="og:image" content="https://example.com/img.png" />
                ${metaTag}
            </head>
        </html>
    `;
    return html;
}




router.get('/', (req, res) => {
    const frameProps: IFrameProps = {
        imageUrl: FrameImageUrls.START,
        postUrl: `${FRAME_BASE_URL}/api/wallet`,
        buttons: ['Create a wallet'],
    };

    res.status(200).send(frameGenerator(frameProps));
});

export default router;