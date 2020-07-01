const mcData = require('minecraft-data')('1.15.2')
const navigatePlugin = require('mineflayer-navigate')()
const Pipeline = require('../')
const { repeat, restart, raw, wait } = require('../common')
const { findBlock, chat, dig } = require('../tasks')
const bot = require('./bot')

navigatePlugin(bot)

const go = (pos) => raw((result, pipeline, task) => {
	bot.navigate.to((result && result.position.offset(0, 0, 1)) || pos)
	bot.navigate.on('arrived', () => {
		pipeline.next(result, task)
	})
})

const items = mcData.itemsByName

const pipe = new Pipeline(bot)

bot.on('chat', (username, message) => {
    if (username === 'Valet') {
        return
    }

    if (message === 'coord') {
    	console.log(bot.entity.position)
    }

    if (message === 'findTree') {
        pipe.run(findTreeLog(34))
    }
})

const findTreeLog = (treeLogId) => [
	findBlock({ matching: treeLogId }),
	go(),
	dig(),
	wait(500),
	repeat(3),
	restart()
]
