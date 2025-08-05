const Discord = require("discord.js");
const db = require("quick.db");

module.exports.help = {
  name: "setwelcome", 
  perm: "admin",
  description: "Confirgue the welcome channel.",
  usage: " <channel>"
};
module.exports.aliases = [];

module.exports.run = async (client, message, args) => {
 if (!message.member.hasPermission("ADMINISTRATOR")) return;
 let check = await db.get(`welcome_${message.guild.id}.channel`);
  
 let channel = args[0];
 if (channel) {channel = message.mentions.channels.first().id};
 if (!channel) return message.channel.send({
  embed: new Discord.RichEmbed()
  .setColor(client.config.color)
  .setTitle("Command [setwelcome]")
  .setDescription(`**Format:** ${client.config.prefix}setwelcome <channel>\n\n**Current Channel:**\n- ${check ? `<#${check}>`: "None Set."}`)
 })
  
 db.set(`welcome_${message.guild.id}`, {channel: channel});
 return message.channel.send("**Welcome channel set to:** " + message.mentions.channels.first());
}