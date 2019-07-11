const Telegraf = require('telegraf');
const SocksAgent = require('socks5-https-client/lib/Agent');
const { TOKEN, chatID} = require('./config');

const socksAgent = new SocksAgent({
    socksHost: '45.13.31.116',
    socksPort: '60079'
});


const bot = new Telegraf(TOKEN, {telegram : {agent : socksAgent}});

bot.telegram.sendMessage(chatID, '__haha__')
