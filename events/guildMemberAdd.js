const Discord = require("discord.js");
const db = require("quick.db");
module.exports = async (client, member) => {
  
 try {
  member.addRole(member.guild.roles.find('name', `${client.config.autorole}`))
 } catch (e) {
  console.log(e)
 }
 
 let channel = await db.get(`welcome_${member.guild.id}.channel`);
 if (!channel) return;

 try {
  channel = member.guild.channels.find(r => r.id === channel)
  return channel.send({
    embed: new Discord.RichEmbed()
    .setColor(client.config.color)
    .setImage(member.guild.iconURL)
    .setDescription(`Welcome ${member.user}\n\n**Site:** ${client.config.site}\n**Store:** ${client.config.store}`)
  })
 } catch (e) {
  return console.log(e);
 }
};