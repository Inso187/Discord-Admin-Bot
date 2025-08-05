const Discord = require("discord.js");

module.exports.help = {
  name: "remove", 
  perm: "staff",
  description: "Remove a user from the ticket.",
  usage: ""
};
module.exports.aliases = [];

module.exports.run = async (client, message, args) => {
  if (!message.member.roles.some(role => ["Staff"].includes(role.name)) && !message.member.hasPermission("ADMINISTRATOR")) return;
  let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!user) return message.channel.send({
    embed: new Discord.RichEmbed()
    .setColor(client.config.color)
    .setTitle("Command [remove]")
    .setDescription(`**Format:** ${client.config.prefix}remove <user>`)    
  })

  message.channel.overwritePermissions(user, {READ_MESSAGES: false});
  message.delete();
  return message.channel.send({
    embed: new Discord.RichEmbed()
    .setColor(client.config.color)
    .setDescription(`${user} has been removed from the ticket.`)
    .setTimestamp()
    .setFooter("Removed by: " + message.author.username, message.author.avatarURL)
  })
}