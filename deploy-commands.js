/*
	@commande : node deploy-commands.js
	Permet de générer les commandes slash pour l'application.
*/

const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

// Défini la liste de commandes et les chemins en filtrant le type de fichier.
const commands = [];
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	// Récupère le contenu du fichier de commande.
	const command = require(`./commands/${file}`);
	
	// Converti et ajoute la commande au tableau de commandes.
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Les commandes ont été enregistrées avec succès.'))
	.catch(console.error);