const dotenv = require('dotenv');
dotenv.config();
const token = process.env.DISCORD_TOKEN

const fs = require('node:fs');
const path = require('node:path');

const { Client, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
  ]
});
//    ____    ___    __  __   __  __      _      _   _   ____    ____  
//  / ___|  / _ \  |  \/  | |  \/  |    / \    | \ | | |  _ \  / ___| 
// | |     | | | | | |\/| | | |\/| |   / _ \   |  \| | | | | | \___ \ 
// | |___  | |_| | | |  | | | |  | |  / ___ \  | |\  | | |_| |  ___) |
// \____|  \___/  |_|  |_| |_|  |_| /_/   \_\ |_| \_| |____/  |____/ 

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
}

//   _____  __     __  _____   _   _   _____   ____  
// | ____| \ \   / / | ____| | \ | | |_   _| / ___| 
// |  _|    \ \ / /  |  _|   |  \| |   | |   \___ \ 
// | |___    \ V /   | |___  | |\  |   | |    ___) |
// |_____|    \_/    |_____| |_| \_|   |_|   |____/ 
                                                 

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}



client.login(token);