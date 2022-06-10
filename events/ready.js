const User = require('../models/User.js');
const Role = require('../models/Role.js');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Our client is ready for integration and logged in as ${client.user.tag}.`);

		// Synchronizes all data models.
		User.sync();
		Role.sync();
	},
};