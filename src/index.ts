import { Telegraf } from 'telegraf';
import { connect, closeConnection } from './db';

import reply from './middlewares/reply';
import error from './middlewares/error';

import inline from './inline';

const bot: Telegraf = new Telegraf(process.env.BOT_API_TOKEN);

bot.use(reply);
bot.use(error);

bot.on('inline_query', inline);

process.once('SIGINT', () => {
  closeConnection()
    .then(() => console.log('SIGINT occurred, exiting'))
    .catch(() => console.log('SIGINT occurred, exiting with no db connection closed'));
});
process.once('SIGTERM', () => {
  closeConnection()
    .then(() => console.log('SIGTERM occurred, exiting'))
    .catch(() => console.log('SIGTERM occurred, exiting with no db connection closed'));
});

connect()
  .then(() => bot.launch())
  .catch((err) => console.log(err));
