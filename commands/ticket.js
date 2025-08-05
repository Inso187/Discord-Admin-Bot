const Discord = require("discord.js");
const db = require("quick.db");

module.exports.help = {
  name: "ticket", 
  perm: "staff",
  description: "Confirgue the ticket message.",
  usage: " <message>"
};
module.exports.aliases = ["sendticket"];

module.exports.run = async (client, message, args) => {
 if (!message.member.roles.some(role => ["Staff"].includes(role.name)) || !message.member.hasPermission("ADMINISTRATOR")) return;
 let check = await db.get(`ticket_${message.guild.id}.message`);
  
 let content = args.join(" ");
 if (!content) return message.channel.send({
  embed: new Discord.RichEmbed()
  .setColor(client.config.color)
  .setTitle("Command [ticket]")
  .setDescription(`**Format:** ${client.config.prefix}ticket <message>\n\n**Current Message:**\n- ${check ? check : "None Set."}`)
 })
  
 db.set(`ticket_${message.guild.id}`, {message: content});
 return message.channel.send("**Ticket message set!**");
}