const Discord = require("discord.js");
const key = "AIzaSyCa3frSzmY9BKDtjs70IdNHuIH685kjGok"
const yt = require("ytdl-core");
const YouTube = require("simple-youtube-api");
const youtube = new YouTube(key);
const opus = require("node-opus");

module.exports.help = {
  name: "play", 
  perm: "all",
  description: "Add a song to the queue.",
  usage: ""
};
module.exports.aliases = [];

module.exports.run = async (client, message, args, queue) => {

 const searchString = message.content.split(" ").slice(1).join(" ")
 const url = searchString ? searchString.replace(/<(.+)>/g, '$1') : '';
 const serverQueue = queue.get(message.guild.id);
 const voiceChannel = message.member.voiceChannel;
  
 let help = new Discord.RichEmbed()
 .setColor(client.config.color)
 .setTitle("Command [play]")
 .setDescription(`**Format:** ${client.config.prefix}play <song>`)  
 
 if (!args[0] || !searchString) return message.channel.send({embed: help}) 
  
 let voiceEmbed = new Discord.RichEmbed()
 .setAuthor(message.author.username, message.author.avatarURL)
 .setColor(client.config.color)
 .setTitle("Error:")
 .setDescription("You are not in a voice channel.")
  
 if (!voiceChannel) return message.channel.send({embed: voiceEmbed});
    
 const permissions = voiceChannel.permissionsFor(client.user);
 let errorEmbed = new Discord.RichEmbed()
 .setColor(client.config.color)
 .setAuthor(message.author.username, message.author.avatarURL)
 .setTitle("Error:")
 
 if (!permissions.has('CONNECT')) {
  errorEmbed.setDescription("I am missing the permission to connect to the voice channel.")
  return message.channel.send({embed: errorEmbed})
 }
 if (!permissions.has('SPEAK')) {
  errorEmbed.setDescription("I am missing the permission to speak in the voice channel.")
  return message.channel.send({embed: errorEmbed})  
 }
 
 if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
  const playlist = await youtube.getPlaylist(url);
  const videos = await playlist.getVideos();
  for (const video of Object.values(videos)) {
   const video2 = await youtube.getVideoByID(video.id); 
   await handleVideo(video2, message, voiceChannel, true); 
  }
   return message.channel.send(`Playlist: **${playlist.title}** has been added to the queue!`);
  } else {
   try {
    var video = await youtube.getVideo(url);
   } catch (error) {
   try {
    var videos = await youtube.searchVideos(searchString, 1);
          
//   let embed = new Discord.RichEmbed()
//   .setDescription(videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n'))
//   .setColor(client.config.color)
//   .setFooter("Please provide a value to select one of the search results ranging from 1-10.")
                  
//   let msgtoDelete = await message.channel.send({embed: embed});
          
//   try {
//   var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {maxMatches: 1, time: 10000, errors: ['time']});
//    msgtoDelete.delete();
//   } catch (err) {
//    message.channel.send(`**No number was spoken to select a song to play!**`);
//    return msgtoDelete.delete()
//   }
//    const videoIndex = parseInt(response.first().content);
   var video = await youtube.getVideoByID(videos[0].id);
  } catch (err) {
   return message.channel.send('I could not obtain any search results.');
    } 
   }
  }
  return handleVideo(video, message, voiceChannel);

  async function handleVideo(video, message, voiceChannel, playlist = false) {
  const serverQueue = queue.get(message.guild.id);
  const song = {
    id: video.id,
    title: video.title,
    url: `https://www.youtube.com/watch?v=${video.id}`,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
    durations: video.duration.seconds,
  };
  if (!serverQueue) {
   const queueConstruct = { 
   textChannel: message.channel,
   voiceChannel: voiceChannel,
   connection: null,
   skippers: [],
   songs: [],
   volume: 5,
   playing: true
  };
    
  queue.set(message.guild.id, queueConstruct);
  queueConstruct.songs.push(song);

  try {
   var connection = await voiceChannel.join();
   queueConstruct.connection = connection;
   play(message.guild, queueConstruct.songs[0]);
  } catch (error) {
   queue.delete(message.guild.id);
   return message.channel.send(`I could not join the voice channel: ${error}`);
  } 
  } else {
   serverQueue.songs.push(song);
   if (playlist) return undefined;
   else return message.channel.send(`**${song.title}** has been added to the queue!`);
  }
  return undefined;
 }

 function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
   //serverQueue.voiceChannel.leave();
   queue.delete(guild.id);
  return;
 }

 const dispatcher = serverQueue.connection.playStream(yt(song.url))
  .on('end', reason => {
 if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
 else console.log(reason);
 serverQueue.songs.shift();
  setTimeout(() => {
   play(guild, serverQueue.songs[0]);
  }, 250);
 })
 .on('error', error => console.error(error));
 dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

  let durations = song.durations - 1
  var secondslength = Math.log(durations) * Math.LOG10E + 1 | 0;
  var mlength = Math.log(song.durationm) * Math.LOG10E + 1 | 0;
  if (song.durationh !== 0) {
  if (secondslength == 1 || secondslength == 0) {
  if (mlength == 1 || mlength == 0) {
   return serverQueue.textChannel.send(`Now playing: **${song.title}** (${song.durationh}:0${song.durationm}:0${durations})`);
  }}}
  if (song.durationh !== 0) {
  if (secondslength == 1 || secondslength == 0) {
  if (mlength !== 1 || mlength !== 0) {
   return serverQueue.textChannel.send(`Now playing: **${song.title}** (${song.durationh}:${song.durationm}:0${durations})`);
  }}};
  if (song.durationh !== 0) {
  if (mlength == 1 || mlength == 0) {
  if (secondslength !== 1 || secondslength !== 0) {
   return serverQueue.textChannel.send(`Now playing: **${song.title}** (${song.durationh}:0${song.durationm}:${durations})`);
  }}}
  if (song.durationh !== 0) {
  if (mlength !== 1 || mlength !== 0) {
  if (secondslength !== 1 || secondslength !== 0) {
   return serverQueue.textChannel.send(`Now playing: **${song.title}** (${song.durationh}:${song.durationm}:${durations})`);
  }}}
  if(song.durationh == 0 && song.durationm !== 0) {
  if(secondslength == 1 || secondslength == 0) {
   return serverQueue.textChannel.send(`Now playing: **${song.title}** (${song.durationm}:0${durations})`);
  }}
  if(song.durationh == 0 && song.durationm !== 0) {
  if(secondslength !== 1 || secondslength !== 0) {
   return serverQueue.textChannel.send(`Now playing: **${song.title}** (${song.durationm}:${durations})`);
  }}
  if(song.durationh == 0 && song.durationm == 0 && song.durations !== 0) {
   return serverQueue.textChannel.send(`Now playing: **${song.title}** (${durations} Seconds)`);
  } else {
   return serverQueue.textChannel.send(`Now playing: **${song.title}**`);
  }
 }
}