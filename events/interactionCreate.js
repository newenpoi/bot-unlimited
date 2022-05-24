/*
	Les interactions peuvent gérer :
	- Slash Commands,
	- Boutons,
	- ContextMenu
*/

module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		if (!interaction.isCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		try {
			command.execute(interaction);
		} catch (error) {
			console.log(error);
		}

		console.log(`${interaction.user.tag} in #${interaction.channel.name} a exécuté une interaction.`);
	},
};