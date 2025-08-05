const Discord = require("discord.js");
module.exports = async (client) => {
  console.log('\x1b[1m\x1b[32m|     I\'m Online     |')
  client.user.setActivity("🌤 StingCraft 🌤", {type: "Playing"});
}