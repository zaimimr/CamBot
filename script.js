const dotenv = require('dotenv');
dotenv.config();
const token = process.env.DISCORD_TOKEN
const guildId = process.env.GUILD_ID
const noCamRoleId = process.env.NO_CAM_ROLE_ID
const { Client, GatewayIntentBits } = require('discord.js');

const MESSAGE = "You where disconnected from voicechat, because in this discord, you have to turn on cam. Go buy a cam or speak to Admin to get an exception from the rules"


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
  ]
});

const camChecker = async () => {
  console.log("CAM CHECKER RUN")
  await client.guilds.fetch(guildId)
    .then(async (guild) => { return (await guild.members.cache.filter(member => member.voice.channel)) })
    .then(async (members) => {
      await Promise.all(
        members.map(async (member) => {
          if (member.user.bot) return
          if (member._roles.includes(noCamRoleId)) return
          if (!member.voice.selfVideo) {
            await member.voice.disconnect(MESSAGE)
              .then((kickedMember) => {
                kickedMember.createDM(true)
                  .then((dm) => {
                    dm.send(MESSAGE)
                  })
              })
          }
        }))
    })
}

const express = require('express')
const app = express()
const port = 3000;
// respond with "hello world" when a GET request is made to the homepage
app.get('/', async (req, res) => {
  await camChecker()
  res.send('Cam has Checked')
})

client.on('ready', (bot) => {
  console.log("BOT IN RUNNING")
})


app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))
client.login(token);