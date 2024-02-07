const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');

const token = '6955135086:AAEzhuTj1-YG--nAQAwB26GexwGb3ys6Y8E';
const webAppUrl = 'https://308c-94-73-230-225.ngrok-free.app';

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
                keyboard: [
                    [{text: 'Создать мем', web_app: {url: webAppUrl}}]
                ]
            }
        })
    }

    if(msg?.web_app_data?.data) {
        try {
            const data = JSON.parse(msg?.web_app_data?.data)
            console.log(data)

            const { createCanvas, loadImage } = require('canvas')

            const canvas = createCanvas(200, 200)
            const ctx = canvas.getContext('2d')
            const fontSize = 50

            const image = await loadImage('http://localhost:5173' + data.image)
            canvas.width = image.width
            canvas.height = image.height

            ctx.drawImage(image, 0, 0)
            ctx.font = `${fontSize}px Arial`
            ctx.textAlign = 'center'
            ctx.textWrap = 'wrap'
            ctx.fillText(
                data.textUp,
                canvas.width / 2,
                fontSize
            )
            ctx.fillText(
                data.textDown,
                canvas.width / 2,
                canvas.height - 15
            )

            await bot.sendPhoto(chatId, canvas.toBuffer());
        } catch (e) {
            console.log(e);
        }
    }
});

const PORT = 8000;

app.listen(PORT, () => console.log('server started on PORT ' + PORT))