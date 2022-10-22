const { Events } = require('discord.js');

module.exports = {
  name: Events.VoiceStateUpdate,
  async execute(oldState, newState) {
    // if (newState.channelId === null) console.log('user left channel', oldState.channelId);
    // else if (oldState.channelId === null) console.log('user joined channel', newState.channelId);
    // else console.log('user moved channels', oldState.channelId, newState.channelId);
    if (newState.channelId === null) return;

    if (newState.member.user.bot) return;

    // if (newState.selfVideo) 
    console.log(newState.selfVideo)

    // if (oldState.channelId === null) console.log('user joined channel', newState.channelId);
    // else console.log('user moved channels', oldState.channelId, newState.channelId);
  },
};