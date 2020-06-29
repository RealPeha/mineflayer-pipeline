const mineflayer = require('mineflayer')
const mcData = require('minecraft-data')('1.15.2')

const Pipeline = require('../lib')
const { wrap, nextIf, run } = require('../lib/tasks/common')
const { chat, equip, on, off, fish, consume, activateItem } = require('../lib/tasks/mineflayer')

const bot = mineflayer.createBot({
	username: 'Valet',
	host: 'localhost',
	port: 50578,
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
    equip(mcData.itemsByName.fishing_rod.id, 'hand')
        .try(() => {
            nowFishing = true
        }).catch(),
    on('playerCollect', onCollect),
    fish().catch()
]

const stopFishing = () => [
    off('playerCollect', onCollect),
    chat(nowFishing),
    nextIf(nowFishing),
    activateItem()
]

const eat = () => [
    run(stopFishing()),
    equip(mcData.itemsByName.salmon.id, 'hand').catch(),
    consume().catch()
]
