/*
	Interactions can handle :
	- Slash Commands,
	- Buttons,
	- ContextMenu
*/

module.exports = {
	name: 'interactionCreate',
	execute(client, interaction) {
		if (!interaction.isCommand()) return;

		// Calls the command.
		const command = interaction.client.commands.get(interaction.commandName);

		try {
			command.execute(interaction);
		} catch (error) {
			console.log(error);
		}

		console.log(`${interaction.user.tag} in #${interaction.channel.name} executed an interaction.`);
	},
};