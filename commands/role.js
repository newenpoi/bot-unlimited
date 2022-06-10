/*
	Author: Newen
	Contributors :

	The role command.
*/

const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

const Role = require('../models/Role.js');
const reader = require('../util/reader.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('role')
		.setDescription("Permet d'attribuer ou de supprimer automatiquement un rôle lors d'une réaction sur un message.")
		.addStringOption((option) =>
			option
				.setName('action')
				.setDescription("Veux tu que je gère ou que je supprime un rôle dans ma gestion ?")
				.setRequired(true)
				.addChoices({name: 'Ajouter', value: '1'}, {name: 'Supprimer', value: '0'})
		)
		.addStringOption((option) =>
			option
				.setName('identifiant')
				.setDescription('Identifiant du message sur lequel écouter les réactions.')
				.setRequired(true)
		)
		.addRoleOption((option) =>
			option
				.setName('role')
				.setDescription('Indiquer le rôle en question.')
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName('emoji')
				.setDescription("Indiquer l'emoji représentant le rôle (ex: ✅ ou identifiant).")
		),
	async execute(interaction) {
		// This command should not be executed if we dont have the administrator flag.
		if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return;

		// Find the role and emoji we want to use.
		const role = interaction.options.getRole('role');
		const emoji = interaction.options.getString('emoji');

		// Response container (created response by default).
		let response = await reader.read('role', 'create', role);

		// Finds out if the role we want to automatize already exists in the database for this server and channel.
		const data = await Role.findOne({ where: { id_server : interaction.guild.id, id_channel: interaction.channel.id, id_role: role.id } });

		// If there is no data for this role on this server and channel, we can automate a new role.
		if (interaction.options.getString('action') == 1)
		{
			if (data == undefined || data.get('ID_Role') !== role.id) {
				// Fetchs the message specified by id (string).
				const message = await interaction.channel.messages.fetch(interaction.options.getString('identifiant'));
				
				if (message == undefined) response = await reader.read('role', 'message');
				else {
					// Adds a new entry to manage specified role on specified emoji reaction.
					await Role.create({
						ID_Role: role.id,
						ID_Server: interaction.guild.id,
						ID_Channel: interaction.channel.id,
						ID_Message: message.id,
						Emoji: emoji,
					});
				}
			}
			else { response = await reader.read('role', 'duplicate', role); }
		}
		else {
			// We cannot delete this role management if it does not exist in the table.
			console.warn(data.get('ID_Role'));
			console.warn(role.id);
			if (data.get('ID_Role') !== role.id) response = await reader.read('role', 'not-found');
			else {
				// Deletes role data from table.
				await Role.destroy({ where: { id_role: role.id } });
				
				response = await reader.read('role', 'remove', role);
			}
		}

		await interaction.reply({content: response, ephemeral: true});
	},
};
