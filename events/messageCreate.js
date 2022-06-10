module.exports = {
	name: 'messageCreate',
	execute(client, message) {
        if (message.content.includes('Pog!')) {
            message.reply('Pogger!').then(() => console.log(`Pogger!`)).catch(console.error);
        }
	},
};