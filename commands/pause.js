const Discord = require("discord.js");
const yt = require('ytdl-core');
const key = "AIzaSyCa3frSzmY9BKDtjs70IdNHuIH685kjGok";
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(key);
const opus = require("node-opus");

module.exports.help = {
  name: "pause", 
  perm: "all",
  description: "Pause the music queue.",
  usage: ""
};
module.exports.aliases = [];

module.exports.run = async (client, message, args, queue) => {

 const args1 = message.content.split(' ');
 const searchString = args1.slice(1).join(' ');
 const url = args1[1] ? args1[1].replace(/<(.+)>/g, '$1') : '';
 const serverQueue = queue.get(message.guild.id);

 if (serverQueue && serverQueue.playing) {
  serverQueue.playing = false; 
  serverQueue.connection.dispatcher.pause();
  return message.channel.send("**The queue is now paused.**");
 }
  
 return message.channel.send("The player is not currently playing nothing. Use the following command to add a song: `"+client.config.prefix+"play`");
}