const Discord = require('discord.js');
const { TOKEN, MONGO_URI } = require('./env');
const { commands } = require('./commands');
const mentionedBot = require('./middleware/mentionBot');
const { pipe } = require('./helpers/pipe');
const buildDb = require('./db');
const MongoClient = require('mongodb').MongoClient;

const client = new MongoClient(MONGO_URI);
const bot = new Discord.Client();
const state = {};

bot.commands = new Discord.Collection();

function register(bot) {
  commands.forEach((command) => {
    console.log('Registering: ', command);
    bot.commands.set(command.name, command);
  });
}

MongoClient.connect(MONGO_URI, function (err, db) {
  if (err) return console.error(err);

  register(bot);

  const dbService = buildDb(db.db('discord'));

  bot.on('message', (msg) => {
    console.log(msg.content);
    const config = mentionedBot({ state, bot, msg, db: dbService });

    if (!config) return;
    if (!bot.commands.has(config.command)) return;

    try {
      const registeredCommand = bot.commands.get(config.command);
      registeredCommand.execute(
        registeredCommand.pre ? pipe(registeredCommand.pre)(config) : config
      );
    } catch (error) {
      console.error(error);
      msg.reply(`there was an error trying to execute that command: ${error}`);
    }
  });

  bot.login(TOKEN);
});
