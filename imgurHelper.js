const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID;

async function uploadToImgur(imagePath) {
    const form = new FormData();
    form.append('image', fs.createReadStream(imagePath));

    const response = await axios.post('https://api.imgur.com/3/upload', form, {
        headers: {
            Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
            ...form.getHeaders(),
        },
    });

    return response.data.data.link;
}

module.exports = { uploadToImgur };
