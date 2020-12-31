module.exports = {
  name: 'ping',
  description: 'Ping!',
  pre: [require('../middleware/logger')],
  execute({ state, bot, msg }) {
    msg.reply('pong');
  },
};
