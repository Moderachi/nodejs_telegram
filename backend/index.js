const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');

const token = '6955135086:AAEzhuTj1-YG--nAQAwB26GexwGb3ys6Y8E';
const webAppUrl = 'https://1068-45-15-114-104.ngrok-free.app';

const bot = new TelegramBot(token, {polling: true});
const app = express();

app.use(express.json());
app.use(cors());
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if(text === '/start') {
        await bot.sendMessage(chatId, 'Сделай мем по кнопке ниже', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Создать мем', web_app: {url: webAppUrl}}]
                ]
            }
        })
    }
});

const PORT = 8000;

app.listen(PORT, () => console.log('server started on PORT ' + PORT))