const Discord = require("discord.js");

module.exports.help = {
  name: "purge", 
  perm: "admin",
  description: "Purge messages.",
  usage: " [user] [amount]"
};
module.exports.aliases = [];

module.exports.run = async (client, message, args) => {
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return;
  
  if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.channel.send({
   embed: new Discord.RichEmbed()
   .setColor(client.config.color) 
   .setTitle("Error:")
   .setDescription("I currently don't have permission to manage messages.")
  })
    
  let help = new Discord.RichEmbed()
  .setColor(client.config.color)
  .setTitle("Command [purge]")
  .setDescription(`**Format:** ${client.config.prefix}purge [user] [amount]`) 

  if(!args[0]) return message.channel.send({embed: help});
  
  let user = message.mentions.users.first();
  let amount = Number(args[1])
  let amountWithoutUser = Number(args[0])
  
  if(!args[0]) return message.channel.send({embed: help});
  if (amount > 100) amount = 100
  amount++
  
  try {
   let messages = await message.channel.fetchMessages({limit: amount});
   let messages2 = await message.channel.fetchMessages({limit: amountWithoutUser});
    
   if (amountWithoutUser && !user && !amount) {
    message.channel.bulkDelete(messages2)
    return message.channel.send("I've deleted **"+amountWithoutUser+"** messages").then(msg => msg.delete(2000));
   }
    
  if (amount && user) {
   const filterBy = user ? user.id : client.user.id
   messages = messages
   .filter(m => m.author.id === filterBy)
   .array()
   .slice(0, amount)
  }
    
  if (user && !amount) {
   const filterBy = user ? user.id : client.user.id
   messages = messages
   .filter(m => m.author.id === filterBy)
   .array()
   .slice(0, 100)
   amount = 100
      
   await message.channel.bulkDelete(messages)
   amount--
   return message.channel.send("I've deleted **" + amount + "** messages from the user **"+user+"**").then(msg => msg.delete(2000))
  }
   await message.channel.bulkDelete(messages)
   amount--
   return message.channel.send("I've deleted **"+amount+"** messages").then(msg => msg.delete(2000));
  } catch (error) {
   console.log(error); 
  };
  
}