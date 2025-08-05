const Discord = require("discord.js");

module.exports.help = {
  name: "rename", 
  perm: "staff",
  description: "Rename a current ticket.",
  usage: ""
};
module.exports.aliases = [];

module.exports.run = async (client, message, args) => {
 if (!message.member.roles.some(role => ["Staff"].includes(role.name)) && !message.member.hasPermission("ADMINISTRATOR")) return;
 let name = args.join(" ")
 if (!name) return message.channel.send({
  embed: new Discord.RichEmbed()
  .setColor(client.config.color)
  .setTitle("Command [rename]")
  .setDescription(`**Format:** ${client.config.prefix}rename <name>`)
 })
 if (!message.channel.name.includes("ticket-")) return message.channel.send({
  embed: new Discord.RichEmbed()
  .setTitle("Error:")   
  .setColor(client.config.color) 
  .setDescription("This channel is not a ticket.")
 })
 message.channel.setName("ticket-" + name)
 return message.delete()
}