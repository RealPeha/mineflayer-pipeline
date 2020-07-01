const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
	username: 'Valet',
	host: 'localhost',
	port: 54636,
	version: '1.15.2'
})

module.exports = bot
