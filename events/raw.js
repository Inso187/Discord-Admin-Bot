const Discord = require("discord.js");
const db = require("quick.db");
module.exports = async (client, event) => {
  const { d: data } = event;
  
  if (event.t !== 'MESSAGE_REACTION_ADD' || data.emoji.name !== "✅") return;
  let channel = await client.channels.get(data.channel_id);
  let message = await channel.fetchMessage(data.message_id);
  let user = message.guild.members.get(data.user_id);  
  if (user.id === client.user.id || user.id === message.author.id) return;
  
  let member = message.guild.members.get(user.id);
  
  try {
   return member.addRole(member.guild.roles.find(n => n.name === client.config.verifyROLE))
  } catch (e) {
   return console.log(e);
  }
}