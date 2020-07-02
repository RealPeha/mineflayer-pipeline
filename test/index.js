const mcData = require('minecraft-data')('1.15.2')
const navigatePlugin = require('mineflayer-navigate')()
const Pipeline = require('../')
const { repeat, restart, raw, wait, value, run, nextIf, jumpIf } = require('../common')
const { findBlock, say, dig } = require('../tasks')
const bot = require('./bot')

const canReach = () => raw((result, pipeline, task) => {
	if (result.position.offset(0.5, 0.5, 0.5).distanceTo(pipeline.source.entity.position) < 6) {
		return pipeline.next(result, task)
	}

	return pipeline.error(new Error("I can't reach block"), task)
})

navigatePlugin(bot)

const go = (pos) => raw((result, pipeline, task) => {
	bot.navigate.to((result && result.position.offset(0, 0, 1)) || pos)
	bot.navigate.once('arrived', () => {
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

    if (message === 'test') {
        // pipe.run(findTreeLog(34))
        pipe.run(digger())
    }
})

// const findTreeLog = (treeLogId) => [
// 	findBlock({ matching: treeLogId }),
// 	go(),
// 	dig(),
// 	wait(500),
// 	repeat(3),
// 	restart()
// ]

const digger = () => [
	findBlock({ matching: 34 }),
	say(b => b),
	nextIf(Boolean),
	run(digBlock),
	restart()
]

const digBlock = (block) => [
	value(block),
	canReach().catch((err, res) => [
		value(res),
		go(),
	]).next(),
	dig().next()
]
