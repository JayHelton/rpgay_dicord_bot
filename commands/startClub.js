module.exports = {
  name: 'start',
  description: 'Start an RPG Club Sessions!',
  pre: [require('../middleware/logger'), require('../middleware/disabler')],
  async execute({ state, bot, msg, db }) {
    const result = await db.getActiveClubSession();
    if (result) {
      msg.reply('RPG Club is already in sessions.');
    } else {
      const insertResult = db.insertClubSession();
      if (insertResult) {
        msg.reply('RPG Club Started');
      }
    }
  },
};
