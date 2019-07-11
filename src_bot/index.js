const Telegraf = require('telegraf');
const TOKEN = '774011204:AAHHkvu60wNTzxTdo3ozHmHr9EZUwtUcTZU';


const bot = new Telegraf(TOKEN);
bot.start((ctx) => ctx.reply('Welcome'))
bot.on('text', ctx => {
    ctx.reply(ctx.chatId);
})
bot.launch();