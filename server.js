require('dotenv').config();
const express = require('express');
const imgurHelper = require('./imgurHelper');
const iftttHelper = require('./iftttHelper');
const { createCanvas } = require('canvas');
const fs = require('fs');

const app = express();
app.use(express.json());

app.post('/generate-image', async (req, res) => {
    const tweetText = req.body.text;
    const imagePath = generateImage(tweetText);

    try {
        const imgurUrl = await imgurHelper.uploadToImgur(imagePath);
        await iftttHelper.triggerIFTTTWebhook(imgurUrl);
        res.status(200).json({ imageUrl: imgurUrl });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Failed to generate image');
    }
});

function generateImage(text) {
    const width = 800;
    const height = 400;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 30px Sans';
    ctx.fillText(text, 50, 200);

    const buffer = canvas.toBuffer('image/png');
    const filePath = './output.png';
    fs.writeFileSync(filePath, buffer);
    return filePath;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
