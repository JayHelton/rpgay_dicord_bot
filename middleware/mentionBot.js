/**
 * This function is used as a pre-req for all commands. It ensures that the bot
 * was mentioned, and a command follows it with the args.
 */
module.exports = function (config) {
  const { state, bot, msg } = config;
  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const prefix = '!';
  const prefixRegex = new RegExp(
    `^(<@!?${bot.user.id}>|${escapeRegex(prefix)})\\s*`
  );
  if (!prefixRegex.test(msg.content)) {
    return;
  }

  const [, matchedPrefix] = msg.content.match(prefixRegex);
  const args = msg.content.slice(matchedPrefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  return { ...config, args, command };
};
