const { SlashCommandBuilder } = require('@discordjs/builders');

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
		await interaction.reply(
			`Le corps de l'interaction est vide.\nAdministrateur, auriez-vous oublié de définir le contenu à renvoyer ?`
		);
	},
};
