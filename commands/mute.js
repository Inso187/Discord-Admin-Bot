const Discord = require("discord.js");
const ms = require("ms");

module.exports.help = {
  name:"mute", 
  perm: "mods",
  description: "Temporarily mute a user.",
  usage: " <user> <time> [time]"
};
module.exports.aliases = ["tempmute"];

module.exports.run = async (client, message, args) => {
  
 if (!message.member.roles.some(role => ["Trial-Mod", "Moderator"].includes(role.name)) && !message.member.hasPermission("ADMINISTRATOR")) return;
  
 if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.channel.send({
  embed: new Discord.RichEmbed()
  .setColor(client.config.color) 
  .setTitle("Error:")
  .setDescription("I currently don't have permission to manage roles.")
 })
  
 let help = new Discord.RichEmbed()
 .setColor(client.config.color)
 .setTitle("Command [mute]")
 .setDescription(`**Format:** ${client.config.prefix}mute <user> <time> <reason>`) 
   
 if (!args[0]) return message.channel.send({embed: help});
  
 let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
 if (!user) return message.channel.send({embed: help});
  
 let errorEmbed = new Discord.RichEmbed()
 .setTitle("Error:")
 .setColor(client.config.color) 
 .setDescription("This user is higher positioned via perimissions.")

 if (user.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition) return message.channel.send({embed: errorEmbed}).then(p => p.delete(6000));
 let role = message.guild.roles.find(n => n.name === "Muted");
 
 if (!role){
  try{
  role = await message.guild.createRole({
   name: "Muted",
   color: "#000000",
   permissions: []
  })
  message.guild.channels.forEach(async (channel, id) => {
  await channel.overwritePermissions(role, {
   SEND_MESSAGES: false,
   ADD_REACTIONS: false
   });
  });
  }catch(e){return console.log(e.stack)}
 }
 if (user.roles.has(role.id)) return message.channel.send("User is already muted.").then(p => p.delete(6000))
 let time = args[1];
 let reason = args.slice(1).join(" ");
 if (!time || !reason) return message.channel.send({embed: help});

 await user.addRole(role.id);
 message.channel.send(`***${user.user.tag}*** has been muted!`).then(async function (msg) {
      
 client.users.get(user.id).send(`You have been muted in ${message.guild.name} for: **${reason}**`, {
 }).catch(err => {
  return console.log(err)
 })
})

 setTimeout(function(){
  user.removeRole(role.id);
 }, ms(time));
  
}