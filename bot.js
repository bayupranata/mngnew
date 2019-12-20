// https://uptimerobot.com | menjaga bot tetap online
const express = require('express');
const http = require('http');
const app = express();
// 5 Minute Ping Times
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");
const db = require("quick.db");
const moment = require("moment");

const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");

config({
    path: __dirname + "/.env"
});

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  let data = {
    id: client.user.id,
    Tag: client.user.tag,
    Username: client.user.username,
    discriminator: client.user.discriminator,
    avatarURL: client.user.displayAvatarURL,
    guilds: client.guilds.size,
    users: client.users.size,
    channels: client.channels.size,
    ping: Math.round(client.ping),
    uptime: client.uptime,
    prefix: "b!",
    version: require("./package.json").version,
    invite: `https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=-1`
  }
  response.json(data)
});
client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online!`);

  setInterval(async () => {
    let statuses = ['DEV 𝘽𝙖𝙮𝙮𝙋𝙧𝙖𝙣𝙖𝙩𝙖𝙖#9964' , 'discord.gg/XXDADSR', '𝐡𝐭𝐭𝐩𝐬://𝐗𝐍𝐗𝐗.𝐂𝐎𝐌']
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    client.user.setPresence({
      game: {
        name: `${status}`,
        type:"PLAYING",
        url: 'https://twitch.tv/𝘽𝙖𝙮𝙮𝙋𝙧𝙖𝙣𝙖𝙩𝙖𝙖'
      },
      status: "online"
    });
    }, 3000);
  
  setInterval(async () => {
    let guild = client.guilds.get("652060375042490409") // id server LU NYETT
    let role = guild.roles.get("652345535348473877") // id role rainbow lu tod///role bot
    role.setColor("RANDOM")
  }, 3000);
  
  setInterval(async () => {
    let guild = client.guilds.get("652060375042490409") // ganti ama id server lu yang ada sistem jamnya
    let kntl = await db.fetch(`wit_${guild.id}`)
    let ch = client.channels.get(kntl)
    if (ch) {
      ch.setName(`${moment().utcOffset('+0900').locale('id').format('🕒 HH:mm')} 𝘞𝘐𝘛`)
    }
  }, 3000);
  setInterval(async () => {
    let guild = client.guilds.get("652060375042490409") // ganti ama id server lu yang ada sistem jamnya
    let kntl = await db.fetch(`wib_${guild.id}`)
    let ch = client.channels.get(kntl)
    if (ch) {
      ch.setName(`${moment().utcOffset('+0700').locale('id').format('🕒 HH:mm')} 𝘞𝘐B `)
    }
  }, 3000);
  setInterval(async () => {
    let guild = client.guilds.get("652060375042490409") // ganti ama id server lu yang ada sistem jamnya
    let kntl = await db.fetch(`wita_${guild.id}`)
    let ch = client.channels.get(kntl)
    if (ch) {
      ch.setName(`${moment().utcOffset('+0800').locale('id').format('🕒 HH:mm')} 𝘞𝘐𝘛A `)
    }
  }, 3000);
  setInterval(async () => {
    let guild = client.guilds.get("652060375042490409") // ganti ama id server lu yang ada sistem jamnya
    let kntl = await db.fetch(`members_${guild.id}`)
    let ch = client.channels.get(kntl)
    if (ch) {
      ch.setName(`${guild.members.filter(m => !m.user.bot)} `)
    }
  }, 3000);
});

client.on("message", async message => {
    const prefix = "b!";

    if (message.author.bot) return;
    if (!message.guild) return;
  
  if(message.content.startsWith("jancok")) {
    return message.reply("gblg")
  }
  if(message.content.startsWith("!dc")) {
    return message.reply("https://discord.gg/XXDADSR")
  }
  if (message.content.startsWith("link")) {
    return message.reply("``111.90.150.204`` ``COPY PASTE KEGOOGLE OKE:)``"); // GOBLOG
  }
  // misalkan mau buat triggered message tanpa prefix tulisnya diatas ini
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) 
        command.run(client, message, args);
});

client.login(process.env.TOKEN);
