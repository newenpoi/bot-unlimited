/*
	Author : Newen

	The ping command.
*/

const { SlashCommandBuilder } = require('@discordjs/builders');
const reader = require('../util/reader.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Renvoie la latence de cette application.'),
	async execute(interaction) {
		// Gets the response required for this interaction.
		let line = await reader.read(interaction.commandName, 'latency', (Math.abs(Date.now() - interaction.createdTimestamp)));
		
		await interaction.reply(line);
	},
};
