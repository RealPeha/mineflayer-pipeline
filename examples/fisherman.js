// https://github.com/PrismarineJS/mineflayer/blob/master/examples/fisherman.js

const mineflayer = require('mineflayer')
const mcData = require('minecraft-data')('1.15.2')

const Pipeline = require('../')
const { value, nextIf, run } = require('../common')
const { chat, equip, on, off, fish, consume, activateItem } = require('../tasks')

const items = mcData.itemsByName

const bot = mineflayer.createBot({
	username: 'Valet',
	host: 'localhost',
	port: 51005,
	version: '1.15.2'
})

const pipe = new Pipeline(bot)

let nowFishing = false

bot.on('chat', (username, message) => {
    if (username === 'Valet') {
        return
    }

    if (message.includes('start')) {
        pipe.run(startFishing())
    }

    if (message.includes('eat')) {
        pipe.run(eat())
    }

    if (message.includes('stop')) {
        pipe.run(stopFishing())
    }
})

const onCollect = (player, entity) => {
    if (entity.kind === 'Drops' && player === bot.entity) {
        bot.removeListener('playerCollect', onCollect)
        pipe.run(startFishing())
    }
}

// pipelines
const startFishing = () => [
    chat('Fishing'),
    value(items.fishing_rod.id),
    equip('hand')
        .try(() => (nowFishing = true))
        .catch(),
    on('playerCollect', onCollect),
    fish().catch()
]

const stopFishing = () => [
    off('playerCollect', onCollect),
    nextIf(nowFishing),
    activateItem()
        .try(() => (nowFishing = false)),
]

const eat = () => [
    run(stopFishing()),
    value(items.salmon.id),
    equip('hand'),
    consume()
]
