module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Our client is ready for integration and logged in as ${client.user.tag}.`);
	},
};