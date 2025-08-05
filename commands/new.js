const Discord = require("discord.js");
const db = require("quick.db");

module.exports.help = {
  name: "new", 
  perm: "all",
  description: "Create a support ticket.",
  usage: ""
};
module.exports.aliases = [];

module.exports.run = async (client, message, args) => {
 let ticketMSG = await db.get(`ticket_${message.guild.id}.message`);
 if (!ticketMSG) {ticketMSG = "**__Ticket__**\nPlease be patient! staff will be with you shortly.\n\n**NOTE:** Do not ask staff to look at your ticket.\n\nThank you."}
  
 message.guild.createChannel(`ticket-${message.author.username}`, {type: "text"}).then(async function (chan) {
  await chan.overwritePermissions(message.guild.roles.find(n => n.name === '@everyone'), {
   VIEW_CHANNEL: false, SEND_MESSAGES: false, ADD_REACTIONS: false})
  await chan.setParent(client.config.ticketID)
  await chan.overwritePermissions(message.author, {
   VIEW_CHANNEL: true });  
  return chan.send({
    embed: new Discord.RichEmbed()
    .setColor(client.config.color)
    .setFooter(message.author.tag, message.author.avatarURL)
    .setTimestamp()
    .setDescription(ticketMSG)
  })
 })
 
}