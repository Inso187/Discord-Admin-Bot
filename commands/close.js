const Discord = require("discord.js");

module.exports.help = {
  name: "close", 
  perm: "staff",
  description: "Close a open ticket",
  usage: ""
};
module.exports.aliases = [];

module.exports.run = async (client, message, args) => {
 if (!message.member.roles.some(role => ["Staff"].includes(role.name)) && !message.member.hasPermission("ADMINISTRATOR")) return;
 if (!message.channel.name.includes("ticket-")) return message.channel.send({
  embed: new Discord.RichEmbed()
  .setTitle("Error:")   
  .setDescription("This channel is not a ticket.")
 })
 message.channel.delete()
}