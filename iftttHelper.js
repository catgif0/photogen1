const axios = require('axios');

const IFTTT_WEBHOOK_URL = process.env.IFTTT_WEBHOOK_URL;

async function triggerIFTTTWebhook(imageUrl) {
    await axios.post(IFTTT_WEBHOOK_URL, { value1: imageUrl });
}

module.exports = { triggerIFTTTWebhook };
