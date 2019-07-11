const Telegraf = require('telegraf');
const TOKEN = '';


const bot = new Telegraf(TOKEN);
bot.start((ctx) => ctx.reply('Welcome'))
bot.on('text', ctx => {
    ctx.reply(ctx.chatId);
})
bot.launch();