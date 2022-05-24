module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Le client est paré à l'intégration et loggé en tant que ${client.user.tag}.`);
	},
};