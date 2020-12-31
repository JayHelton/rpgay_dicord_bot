module.exports = function (config) {
  const { db, msg, args, command } = config;
  db.insertEvent({
    msg: msg.content,
    args,
    command,
    date: new Date(),
    author: msg.author.id,
  });
  return config;
};
