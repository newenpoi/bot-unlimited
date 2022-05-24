const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Renvoie la latence de cette application.'),
	async execute(interaction) {
		await interaction.reply(`Latence actuelle... ${Math.abs(Date.now() - interaction.createdTimestamp) / 100} ms.`);
	},
};
