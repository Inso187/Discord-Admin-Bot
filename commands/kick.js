const Discord = require("discord.js");

module.exports.help = {
  name:"kick", 
  perm: "mods",
  description: "Kick a user from your server.",
  usage: " <user> [reason]"
};
module.exports.aliases = [];

module.exports.run = async (client, message, args) => {
  
  if (!message.member.roles.some(role => ["Trial-Mod", "Moderator"].includes(role.name)) && !message.member.hasPermission("ADMINISTRATOR")) return;
      
  if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return message.channel.send({
   embed: new Discord.RichEmbed()
   .setColor(client.config.color) 
   .setTitle("Error:")
   .setDescription("I currently don't have permission to kick members.")
  })
    
  let help = new Discord.RichEmbed()
  .setColor(client.config.color)
  .setTitle("Command [kick]")
  .setDescription(`**Format:** ${client.config.prefix}kick <user> [reason]`) 
        
  if(!args[0]) return message.channel.send({embed: help});
      
  let user = message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!user) return message.channel.send({embed: help});
  
  let errorEmbed = new Discord.RichEmbed()
  .setTitle("Error:")
  .setColor(client.config.color) 
  .setDescription("This user is higher positioned via perimissions.")  

  if (user.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition) return message.channel.send({embed: errorEmbed}).then(p => p.delete(6000));

  let reason = args.slice(1).join(" "); 
  
  message.guild.member(user).kick()
  
  message.channel.send("**" + user.user.tag + "** has been kicked.").then(async function (msg) {   
      
  client.users.get(user.id).send(`You have been kicked from ${message.guild.name} for: **${reason}**`, {
    
  }).then(msg.edit("**" + user.user.tag + "** has been kicked.")).catch(err => {
   return console.log(err)
  })
})
                                                                                                  
}