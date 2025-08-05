const Discord = require("discord.js");
const coolD = new Set();
const ms = require("ms");

module.exports.help = {
  name: "tempban", 
  perm: "mod",
  description: "Tempban a user.",
  usage: " <user> <time> [reason]"
};
module.exports.aliases = [];

module.exports.run = async (client, message, args) => {
  
 if (!message.member.roles.some(role => ["Moderator"].includes(role.name)) && !message.member.hasPermission("ADMINISTRATOR")) return;

 let help = new Discord.RichEmbed()
 .setColor(client.config.color)
 .setTitle("Command [tempban]")
 .setDescription(`**Format:** ${client.config.prefix}tempban <user> <time> [reason]`) 

 let user = message.mentions.members.first() || message.guild.members.get(args[0]);
 if (!user) return message.channel.send({embed: help});
  
 let errorEmbed = new Discord.RichEmbed()
 .setTitle("Error:")
 .setColor(client.config.color) 
 .setDescription("This user is higher positioned via perimissions.")

 if (user.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition) return message.channel.send({embed: errorEmbed}).then(msg => msg.delete(6000));
 if (user === message.author.id) return;  
  
 let time = args[1];
 if(!time) return message.channel.send({embed: help});
 let reason = args.split(1).join(" ");
 if(!reason) {reason = "No Reason Provided"};
  
 message.guild.member(user).ban({days: 7,reason: reason})
     
 message.channel.send("**" + user.user.tag + "** has been temp banned!").then(async function (msg) {
      
 client.users.get(user.id).send(`You have been banned from ${message.guild.name} for: **${reason}**`, {
 }).then(msg.edit("**" + user.user.tag + "** has been banned!")).catch(err => {
  return console.log(err)
 })
})
      
 setTimeout(function(){
  message.guild.unban(user);
 }, ms(time));
 
}