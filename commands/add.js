const Discord = require("discord.js");

module.exports.help = {
  name: "add",
  perm: "staff",
  description: "Add a user to a ticket.",
  usage: " <user>"
};
module.exports.aliases = [];

module.exports.run = async (client, message, args) => {
  if (!message.member.roles.some(role => ["Staff"].includes(role.name)) && !message.member.hasPermission("ADMINISTRATOR")) return;
  let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!user) return message.channel.send({
    embed: new Discord.RichEmbed() 
    .setColor(client.config.color)
    .setTitle("Command [add]")
    .setDescription(`**Format:** ${client.config.prefix}add <user>`)    
  })

  message.channel.overwritePermissions(user, {READ_MESSAGES: true});
  message.delete();
  return message.channel.send({
    embed: new Discord.RichEmbed()
    .setColor(client.config.color)
    .setDescription(`${user} has been added to the ticket!`)
    .setTimestamp()
    .setFooter("Added by: " + message.author.username, message.author.avatarURL)
  })
}