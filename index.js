const fs = require('node:fs');
const path = require('node:path');

// Required Discord classes.
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

function loadCommands() {
    // New integrated collection of command definitions.
    client.commands = new Collection();
    const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        // Gets the content of command file.
        const command = require(`./commands/${file}`);

        // Key as command name and exported module as value.
        client.commands.set(command.data.name, command);
    }
}

function loadEvents() {
    // Gets events files.
    const eventFiles = fs.readdirSync(path.join(__dirname, 'events')).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        // Gets event file content.
        const event = require(`./events/${file}`);
        
        // Calls the execute function depending on the event.
        if (event.once) client.once(event.name, (...args) => event.execute(...args));
        else client.on(event.name, (...args) => event.execute(client, ...args));
    }
}

// A new client instance...
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

loadCommands();
loadEvents();

// Connects to discord...
client.login(token);