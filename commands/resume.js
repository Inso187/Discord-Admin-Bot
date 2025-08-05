const Discord = require("discord.js");
const key = "AIzaSyCa3frSzmY9BKDtjs70IdNHuIH685kjGok"
const yt = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(key);
const opus = require("node-opus");

module.exports.help = {
  name: "resume", 
  perm: "all",
  description: "Resume the current queue.",
  usage: ""
};
module.exports.aliases = [];

module.exports.run = async (client, message, args, queue) => {

  const args1 = message.content.split(' ');
  const searchString = args1.slice(1).join(' ');
  const url = args1[1] ? args1[1].replace(/<(.+)>/g, '$1') : '';
  const serverQueue = queue.get(message.guild.id);
  
  if (serverQueue && !serverQueue.playing) {
   serverQueue.playing = true;
   serverQueue.connection.dispatcher.resume();
   return message.channel.send('**Queue resumed.**');
  }
  
  return message.channel.send("The player is not currently playing nothing. Use the following command to add a song: `"+client.config.prefix+"play`");
}