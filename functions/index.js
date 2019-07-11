const functions = require('firebase-functions');
const cors = require('cors');
const Telegraf = require('telegraf');
const config = require('./config');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const bot = new Telegraf(config.TOKEN);

const whitelist = [
    'https://hookah-catering-69873.firebaseapp.com', 
    'https://hookah-catering-69873.web.app'
]
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

exports.newOrder = functions.https.onRequest((req, resp) => {
    return cors(corsOptions)(req, resp, () => {
        console.log('Request body - ', req.body)
        if (req.body) {
            const orderMsg =
            `
            !!! НОВЫЙ ЗАКАЗ !!!
            Телефон - ${req.body.phone}
            Имя - ${req.body.name}
            Детали :
            ${req.body.details} 
            `
            console.log('Final msg - ', orderMsg);
            bot.telegram.sendMessage(config.chatID, orderMsg);
            resp.send("fine");
        } else {
            resp.status('400').send();
        }
    })
})