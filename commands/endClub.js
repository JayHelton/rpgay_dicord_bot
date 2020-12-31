module.exports = {
  name: 'end',
  description: 'End an RPG Club Sessions!',
  pre: [require('../middleware/logger')],
  async execute({ state, bot, msg, db }) {
    const result = await db.getActiveClubSession();
    if (result) {
      const result = await db.endClubSession();
      msg.reply('RPG Club sessions has come to a close.');
    } else {
      msg.reply('There is no active rpg club session.');
    }
  },
};
