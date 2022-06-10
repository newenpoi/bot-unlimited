/*
    Author : Newen
    Attention, lorsque vous utilisez un fetch assurez-vous d'await celui ci.
    Careful, when fetching data make sure you are awaiting it.

    https://discord.js.org/#/docs/main/stable/class/MessageReaction
    https://discord.js.org/#/docs/main/stable/class/User
*/

const Role = require('../models/Role.js');

module.exports = {
	name: 'raw',
    events: ['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'],
	async execute(client, event) {
		// We only want to take care of specific events.
		if (!this.events.includes(event.t)) return;

        // We dont want the bot to interfere.
        if (event.d.user_id == client.user.id) return;

		// We will verify if this reaction belongs to a message used to manage roles stored in the database.
		const data = await Role.findOne({
			where: {
				id_server: event.d.guild_id,
				id_channel: event.d.channel_id,
				id_message: event.d.message_id,
				emoji: event.d.emoji.name,
			},
		});

        if (data && data.get('Emoji') == event.d.emoji.name) {
			
            const guild = client.guilds.cache.get(event.d.guild_id);
			let role = await guild.roles.fetch(data.get('ID_Role'));
			let member = await guild.members.fetch(event.d.user_id);

			try {
				// Checks which event we want to do and adds or removes the role.
				if (event.t == this.events[0]) await member.roles.add(role);
				else await member.roles.remove(role);
			} catch (error) {
				console.log('Permission non évaluée pour gérer ce rôle.');
			}
        }
	},
};
