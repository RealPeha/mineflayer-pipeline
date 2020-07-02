const mineflayer = require('mineflayer')
const navigatePlugin = require('mineflayer-navigate')()

const Queue = require('better-queue')

const bot = mineflayer.createBot({
	username: 'Loh',
	host: 'localhost',
	port: 39713,
	version: '1.15.2'
})

navigatePlugin(bot)

bot.on('chat', () => {
    digger()
})

let n = 10

const digger = () => {
    n--

    if (n < 0) {
        return
    }

    const block = bot.findBlock({ matching: 34 })

    if (block) {
        if (bot.canDigBlock(block)) {
            bot.dig(block, (err) => {
                if (!err) {
                    digger()
                }
            })
        } else {
            bot.navigate.to(block.position.offset(0, 0, 1))
            bot.navigate.once('arrived', (err) => {
                bot.dig(block, (err) => {
                    if (!err) {
                        digger()
                    }
                })
            })
        }
    }
}