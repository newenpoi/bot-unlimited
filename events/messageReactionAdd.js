/*
    Author : Newen
	Cet événement ne traite pas les réactions sur les anciens messages (voir raw reaction à la place).
	This event does not handle reactions on older messages (see raw reaction instead).

    Doc :
    https://discord.js.org/#/docs/main/stable/class/MessageReaction
    https://discord.js.org/#/docs/main/stable/class/User
*/

module.exports = {
	name: 'messageReactionAdd',
	async execute(client, reaction, user) {
		// When a reaction is received, checks if the structure is partial.
		if (reaction.partial) {
			// Handles fetching to avoid API errors.
			try {
				await reaction.fetch();
			} catch (error) {
				console.error('We cant fetch this message : ', error);
				return;
			}
		}

		console.log(
			`${reaction.message.author.username}'s message gained a reaction (${reaction.emoji}) from ${user.username} !`
		);
	},
};
