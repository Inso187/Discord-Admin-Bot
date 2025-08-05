const Discord = require("discord.js");

module.exports.help = {
  name: "help"
};
module.exports.aliases = [];

module.exports.run = async (client, message, args) => {
 let content = '';
  
 content += client.commands.filter(cmd => cmd.help.perm === 'all').map(cmd => `**${client.config.prefix}${cmd.help.name}**${cmd.help.usage} • ${cmd.help.description}`).join("\n")
 if (message.member.roles.some(role => ["Staff"].includes(role.name)) || message.member.hasPermission("ADMINISTRATOR")) {
  content += '\n'
  content += client.commands.filter(cmd => cmd.help.perm === 'staff').map(cmd => `**${client.config.prefix}${cmd.help.name}**${cmd.help.usage} • ${cmd.help.description}`).join("\n")
 }
 if (message.member.roles.some(role => ["Moderator"].includes(role.name)) || message.member.hasPermission("ADMINISTRATOR")) {
   content += '\n'
  content += client.commands.filter(cmd => cmd.help.perm === 'mod').map(cmd => `**${client.config.prefix}${cmd.help.name}**${cmd.help.usage} • ${cmd.help.description}`).join("\n")
 }
 if (message.member.roles.some(role => ["Trial-Mod", "Moderator"].includes(role.name)) || message.member.hasPermission("ADMINISTRATOR")) {
  content += '\n'
  content += client.commands.filter(cmd => cmd.help.perm === 'mods').map(cmd => `**${client.config.prefix}${cmd.help.name}**${cmd.help.usage} • ${cmd.help.description}`).join("\n")
 }
 if (message.member.hasPermission("ADMINISTRATOR")) { 
  content += '\n'
  content += client.commands.filter(cmd => cmd.help.perm === 'admin').map(cmd => `**${client.config.prefix}${cmd.help.name}**${cmd.help.usage} • ${cmd.help.description}`).join("\n")
 }
  
 return message.author.send({
   embed: new Discord.RichEmbed()
   .setColor(client.config.color)
   .setDescription(content)
   .setFooter(`<> = Optional [] = Required`)
 })
}