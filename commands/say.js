const Discord = require("discord.js");

module.exports.help = {
  name: "say", 
  perm: "all",
  description: "Say a message using the bot",
  usage: " <say>"
};
module.exports.aliases = [];

module.exports.run = async (client, message, args) => {
 if (!message.member.hasPermission("ADMINISTRATOR")) return;
 let say = args.join(" ")
 if (!say) return message.channel.send({
  embed: new Discord.RichEmbed()
  .setColor(client.config.color)
  .setTitle("Command [say]")
  .setDescription(`**Format:** ${client.config.prefix}say <say>`)    
 }) 
 message.delete()
 return message.channel.send({
   embed: new Discord.RichEmbed()
   .setDescription(say)
   .setColor(client.config.color)
   .setFooter("Sent by: " + message.author.username, message.author.avatarURL)
 }).then(async function (msg) {
 })
}