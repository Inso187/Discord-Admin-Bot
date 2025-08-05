const Discord = require("discord.js");

module.exports.help = {
  name: "suggest", 
  perm: "all",
  description: "Submit a suggestion",
  usage: " <suggestion>"
};
module.exports.aliases = [];

module.exports.run = async (client, message, args) => {
 let suggestion = args.join(" ")
 if (!suggestion) return message.channel.send({
  embed: new Discord.RichEmbed()
  .setColor(client.config.color)
  .setTitle("Command [suggestion]")
  .setDescription(`**Format:** ${client.config.prefix}suggestion <suggestion>`)    
 }) 
 message.delete()
 return message.channel.send({
   embed: new Discord.RichEmbed()
   .setTitle("Suggestion")
   .setDescription(suggestion)
   .setColor(client.config.color)
   .setFooter("Suggestion by: " + message.author.username, message.author.avatarURL)
 }).then(async function (msg) {
  await msg.react("✅")
  await msg.react("❌")         
 })
}