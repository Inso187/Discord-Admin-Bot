const Discord = require("discord.js");
const db = require("quick.db");

module.exports.help = {
  name: "setannounce", 
  perm: "admin",
  description: "Confirgue the announcement channel.",
  usage: " <channel>"
};
module.exports.aliases = [];

module.exports.run = async (client, message, args) => {
 if (!message.member.hasPermission("ADMINISTRATOR")) return;
 let check = await db.get(`announce_${message.guild.id}.channel`);
  
 let channel = args[0];
 if (channel) {channel = message.mentions.channels.first().id};
 if (!channel) return message.channel.send({
  embed: new Discord.RichEmbed()
  .setColor(client.config.color)
  .setTitle("Command [setannounce]")
  .setDescription(`**Format:** ${client.config.prefix}setannounce <channel>\n\n**Current Channel:**\n- ${check ? `<#${check}>`: "None Set."}`)
 })
  
 db.set(`announce_${message.guild.id}`, {channel: channel});
 return message.channel.send("**Announce channel set to:** " + message.mentions.channels.first());
}