module.exports = {
  name: 'nominate',
  description: 'Allows users to nominate games for the rpgay gamers club.',
  pre: [require('../middleware/logger'), require('../middleware/disabler')],
  async execute({ msg, args, db }) {
    const session = await db.getActiveClubSession();
    const nom = args.join(' ');
    if (session) {
      if (!session.nominations[msg.author.id]) {
        await db.insertClubNomination(msg.author.id, nom);
        msg.reply(`${nom} has been nominated!`);
      } else {
        msg.reply('You have hit your limit of nominations.');
      }
    } else {
      msg.reply('There is no active rpg club session.');
    }
  },
};
