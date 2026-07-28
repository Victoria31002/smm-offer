'use strict';

const https = require('https');

const BOT_USERNAME = '@smm_viktoryia_bot';

const escapeTelegram = (value) => String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const postJson = (url, body) => new Promise((resolve, reject) => {
    const payload = JSON.stringify(body);
    const requestUrl = new URL(url);

    const request = https.request({
        hostname: requestUrl.hostname,
        path: requestUrl.pathname + requestUrl.search,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload),
        },
    }, (response) => {
        let raw = '';

        response.on('data', (chunk) => {
            raw += chunk;
        });

        response.on('end', () => {
            try {
                resolve({
                    ok: response.statusCode >= 200 && response.statusCode < 300,
                    data: JSON.parse(raw),
                });
            } catch (error) {
                reject(error);
            }
        });
    });

    request.on('error', reject);
    request.write(payload);
    request.end();
});

const handleContactRequest = async (body) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
        console.error(`Telegram is not configured. Check env for ${BOT_USERNAME}.`);
        return {
            status: 500,
            body: { error: 'Telegram is not configured on the server.' },
        };
    }

    const { name, tel, message, source } = body ?? {};

    if (!name || !tel) {
        return {
            status: 400,
            body: { error: 'Name and contact (phone or Telegram) are required.' },
        };
    }

    const lines = [
        '<b>Новая заявка с сайта</b>',
        source ? `Форма: ${escapeTelegram(source)}` : null,
        `Имя: ${escapeTelegram(name)}`,
        `Телефон / Telegram: ${escapeTelegram(tel)}`,
        message ? `Сообщение: ${escapeTelegram(message)}` : null,
    ].filter(Boolean);

    try {
        const { ok, data } = await postJson(`https://api.telegram.org/bot${token}/sendMessage`, {
            chat_id: chatId,
            text: lines.join('\n'),
            parse_mode: 'HTML',
        });

        if (!ok || !data.ok) {
            console.error('Telegram API error:', data);
            return {
                status: 502,
                body: { error: 'Failed to send message to Telegram.' },
            };
        }

        return { status: 200, body: { ok: true } };
    } catch (error) {
        console.error('Contact send error:', error);
        return { status: 500, body: { error: 'Server error.' } };
    }
};

module.exports = { handleContactRequest };
