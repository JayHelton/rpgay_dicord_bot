module.exports = {
  name: '🌮',
  description: 'Give all the tacos!',
  pre: [require('../middleware/logger')],
  async execute({ msg, db }) {
    console.log(msg.content);
    const tacoCount = (msg.content.match(/🌮/g) || []).length;
    const peopleMentions = msg.mentions.users.reduce((accu, curr) => {
      if (!curr.bot) {
        accu.push(curr.id);
      }
      return accu;
    }, []);

    peopleMentions.forEach(async (p) => {
      const { value } = await db.updateTacos({ uid: p, tacos: tacoCount });
      if (value) {
        console.log(value);
        msg.channel.send(`<@!${p}> now has ${value.tacos} tacos.`);
      }
    });
  },
};
