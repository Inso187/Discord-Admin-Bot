const Discord = require("discord.js");
const db = require("quick.db");

module.exports.help = {
  name: "announce", 
  perm: "admin",
  description: "Announce an announcement",
  usage: " <message>"
};
module.exports.aliases = [];

module.exports.run = async (client, message, args) => {
 if (!message.member.hasPermission("ADMINISTRATOR")) return;
 let channel = await db.get(`announce_${message.guild.id}.channel`);
 if (!channel) return message.channel.send({
  embed: new Discord.RichEmbed()
  .setColor(client.config.color)
  .setTitle("Error:")
  .setDescription("No announcement channel set. Do so with: `"+client.config.prefix+"setannounce <channel>`")
 }) 
  
 channel = message.guild.channels.find(r => r.id === channel)
  
 let content = args.join(" ")
 if (!content) return message.channel.send({
  embed: new Discord.RichEmbed()
  .setColor(client.config.color)
  .setTitle("Command [announce]")
  .setDescription(`**Format:** ${client.config.prefix}announce <message>\n\n**Current Channel:**\n- <#${channel}>`)   
 })
  
 return channel.send({
  embed: new Discord.RichEmbed()
  .setColor(client.config.color)
  .setTitle("🔔 Announcement")
  .setDescription(content)
  .setFooter("Announcement by: " + message.author.username, message.author.avatarURL) 
 })
 
}