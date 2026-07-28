'use strict';

const https = require('https');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
    console.error('TELEGRAM_BOT_TOKEN is missing in .env');
    process.exit(1);
}

const formatChatLabel = (chat) => {
    const parts = [chat.first_name, chat.last_name, chat.username ? `@${chat.username}` : '']
        .filter(Boolean);
    return parts.join(' ') || `chat ${chat.id}`;
};

const getJson = (url) => new Promise((resolve, reject) => {
    const requestUrl = new URL(url);

    https.get(requestUrl, (response) => {
        let raw = '';

        response.on('data', (chunk) => {
            raw += chunk;
        });

        response.on('end', () => {
            try {
                resolve(JSON.parse(raw));
            } catch (error) {
                reject(error);
            }
        });
    }).on('error', reject);
});

const run = async () => {
    const data = await getJson(`https://api.telegram.org/bot${token}/getUpdates`);

    if (!data.ok) {
        console.error('Telegram API error:', data);
        process.exit(1);
    }

    const chats = new Map();

    data.result.forEach((update) => {
        const message = update.message || update.edited_message;
        const chat = message?.chat;
        if (!chat) {
            return;
        }

        const existing = chats.get(chat.id);
        const date = message.date || 0;

        if (!existing || date > existing.lastDate) {
            chats.set(chat.id, {
                chat,
                lastDate: date,
                lastText: message.text || '',
            });
        }
    });

    console.log('Бот: @smm_viktoryia_bot\n');

    if (!chats.size) {
        console.log('Пока никто не писал боту.');
        console.log('1. Откройте Telegram на том аккаунте, куда хотите получать заявки');
        console.log('2. Найдите @smm_viktoryia_bot и нажмите Start');
        console.log('3. Снова выполните: npm run telegram:chat-id');
        process.exit(0);
    }

    const sorted = [...chats.values()].sort((a, b) => b.lastDate - a.lastDate);
    const latest = sorted[0];

    console.log('Аккаунты, которые нажимали Start у бота:\n');
    sorted.forEach((item, index) => {
        const marker = index === 0 ? ' (последний)' : '';
        console.log(`TELEGRAM_CHAT_ID=${item.chat.id}  ${formatChatLabel(item.chat)}${marker}`);
    });

    console.log('\nСкопируйте TELEGRAM_CHAT_ID нужного аккаунта в файл .env');
    console.log(`Рекомендуется последний: TELEGRAM_CHAT_ID=${latest.chat.id}`);
    console.log('\nЕсли нужного аккаунта нет в списке — зайдите в бота с того Telegram и нажмите Start.');
};

run();
