const Discord = require("discord.js");

module.exports.help = {
  name: "bug", 
  perm: "all",
  description: "Submit a bug report",
  usage: " <bug>"
};
module.exports.aliases = [];

module.exports.run = async (client, message, args) => {
 let bug = args.join(" ")
 if (!bug) return message.channel.send({
  embed: new Discord.RichEmbed()
  .setColor(client.config.color)
  .setTitle("Command [bug]")
  .setDescription(`**Format:** ${client.config.prefix}bug <bug>`)    
 }) 
 message.delete()
 return message.channel.send({
   embed: new Discord.RichEmbed()
   .setTitle("Bug Report")
   .setDescription(bug)
   .setColor(client.config.color)
   .setFooter("Bug report by: " + message.author.username, message.author.avatarURL)
 }).then(async function (msg) {
 })
}