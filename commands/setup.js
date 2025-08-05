const Discord = require("discord.js");

module.exports.help = {
 name: "setup", 
 perm: "admin",
 description: "Send the verification message to the message channel.",
 usage: ""
};
module.exports.aliases = [];

module.exports.run = async (client, message, args) => {
 if (!message.member.hasPermission("ADMINISTRATOR")) return;
 let msg = `<:stingcraft:697105789524901898>  **Welcome to StingCraft!** <:stingcraft:697105789524901898> 
Before you head into the discord, you first need to read the rules properly, then react to the :white_check_mark: below. 

**__Discord Rules:__** \`[April 2020]\`
:black_small_square: No excessive swearing.
:black_small_square: No racial slurs.
:black_small_square: No advertising.
:black_small_square: No NSFW. 
:black_small_square: Use the designated channels for your needs, i.e #suggestions for suggestions.
:black_small_square: Don't tag __Admins__ or __above__.
:black_small_square: If you're a non staff player, and you're helping another player, it has to stay in the discord.

**NOTE:** Don't give your credentials to __anyone__! 

Thanks for joining **__StingCraft__** | **Discord** <:stingcraft:697105789524901898>`
 return message.channel.send({
   embed: new Discord.RichEmbed()
   .setColor(client.config.color)
   .setDescription(client.config.verification ? client.config.verification : msg)
 }).then(msg => {msg.react("✅")})
}