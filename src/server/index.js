var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'));
console.log(__dirname);

// Variables for url and api key
const baseURL= 'https://api.meaningcloud.com/sentiment-2.1';
const key = process.env.API_KEY;
console.log(`API key: ${key}`)

app.get('/', function (req, res) {
    res.sendFile(path.resolve('src/client/views/index.html'))
});
// POST Route, fetching from meaning cloud
app.post('/try', async (req, res) => {
    const response = await fetch(`${baseURL}?key=${key}&url=${req.body.url}&lang=en`);
    console.log('response', response);
    const result = await response.json();
    console.log('result', result);
    res.send(result)
    });
// Designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Server is working port 8081!');
});


