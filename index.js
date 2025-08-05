const Discord = require("discord.js");
const db = require("quick.db");
const client = new Discord.Client({disableEveryone: false});

const fs = require("fs");
const { readdirSync } = require('fs');
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

const config = require("./config.json");
const prefix = config.prefix;
client.config = config

const files = readdirSync(__dirname + '/events')
for (const file of files) {
  const event = require(__dirname + `/events/${file}`)
  client.on(file.split('.')[0], event.bind(null, client))
  delete require.cache[require.resolve(__dirname + `/events/${file}`)]
}

fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) return;

  jsfile.forEach((f, i) => {
    delete require.cache[require.resolve(`./commands/${f}`)];
    let props = require(`./commands/${f}`);
    client.commands.set(props.help.name, props);
    props.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.on("error", (e) => console.error(e));
client.on("disconnect", () => console.log("Client is disconnecting.")).on("error", e => console.log(e));
client.on("warn", (e) => console.warn(e));

client.login(config.token).catch(console.error);