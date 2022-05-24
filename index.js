const fs = require('node:fs');
const path = require('node:path');

// Les classes Discord nécessaires.
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

// Nouvelle instance Client.
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Nouvelle collection intégrée au client et définition des fichiers de commande.
client.commands = new Collection();
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    // Récupère le contenu du fichier de commande.
    const command = require(`./commands/${file}`);

    // La clé en tant que nom de commande et valeur en tant que module exporté.
    client.commands.set(command.data.name, command);
}

// Récupère les fichiers événementiels.
const eventFiles = fs.readdirSync(path.join(__dirname, 'events')).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    // Récupère le contenu du fichier d'événement.
	const event = require(`./events/${file}`);
	
    // Appelle la méthode d'exécution en fonction de l'événement.
    if (event.once) client.once(event.name, (...args) => event.execute(...args));
    else client.on(event.name, (...args) => event.execute(...args));
}

// Connexion à Discord...
client.login(token);