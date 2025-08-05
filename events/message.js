const Discord = require("discord.js");
const queue = new Map();
module.exports = async (client, message) => {
  if (message.author.bot) return;
  else if (message.channel.type === "dm") return;
  else if (!message.content.startsWith(client.config.prefix)) return;

  const messageArray = message.content.split(/\s+/g),
   command = messageArray[0],
   args = messageArray.slice(1);

  if (!command.startsWith(client.config.prefix)) return;

  const cmd = client.commands.get(command.slice(client.config.prefix.length).toLowerCase());

  if (cmd) cmd.run(client, message, args, queue);
  if (client.aliases.has(command.slice(client.config.prefix.length).toLowerCase())) {
    client.commands
     .get(client.aliases.get(command.slice(client.config.prefix.length).toLowerCase()))
     .run(client, message, args, queue);
  };
}