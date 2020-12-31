module.exports = {
  name: '🦀',
  description: 'Give all the crabs!',
  pre: [require('../middleware/logger')],
  async execute({ msg, db }) {
    console.log(msg.content);
    const crabCount = (msg.content.match(/🦀/g) || []).length;
    const peopleMentions = msg.mentions.users.reduce((accu, curr) => {
      if (!curr.bot) {
        accu.push(curr.id);
      }
      return accu;
    }, []);

    peopleMentions.forEach(async (p) => {
      const { value } = await db.updateCrabs({ uid: p, crabs: crabCount });
      if (value) {
        console.log(value);
        msg.channel.send(`<@!${p}> now has ${value.crabs} crabs.`);
      }
    });
  },
};
