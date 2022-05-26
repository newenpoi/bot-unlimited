const { SlashCommandBuilder } = require('@discordjs/builders');
const reader = require('../util/reader.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription("Renvoie la description approfondie d'une commande.")
		.addStringOption((option) =>
			option
				.setName('commande')
				.setDescription(
					'La commande dont tu souhaites obtenir une description approfondie.'
				)
				.setRequired(true)
		),
	async execute(interaction) {
		let arg = interaction.options.getString('commande');

		// Gets the response required for this interaction.
		let line = await reader.read(interaction.commandName, arg);

		await interaction.reply(line);
	},
};
