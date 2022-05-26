const user = require('../models/User.js');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Our client is ready for integration and logged in as ${client.user.tag}.`);

		// Synchronizes the User model.
		user.sync();
	},
};