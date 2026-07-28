'use strict';

const express = require('express');
const { handleContactRequest } = require('./lib/contact');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const serveStatic = process.env.SERVE_STATIC !== 'false';
const BOT_USERNAME = '@smm_viktoryia_bot';

app.use(express.json({ limit: '32kb' }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

    if (req.method === 'OPTIONS') {
        res.sendStatus(204);
        return;
    }

    next();
});

app.post('/api/contact', async (req, res) => {
    const result = await handleContactRequest(req.body);
    res.status(result.status).json(result.body);
});

if (serveStatic) {
    app.use(express.static(__dirname));
}

app.listen(PORT, () => {
    console.log(`Contact API listening on http://localhost:${PORT} (bot ${BOT_USERNAME})`);
});
