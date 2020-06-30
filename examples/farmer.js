const mineflayer = require('mineflayer')
const mcData = require('minecraft-data')('1.15.2')

const Pipeline = require('../lib')
const { restart } = require('../lib/common')
const { findBlock, dig, equip, placeBlock } = require('../lib/mineflayer')

const bot = mineflayer.createBot({
	username: 'Valet',
	host: 'localhost',
	port: 50578,
	version: '1.15.2'
})

const pipe = new Pipeline(bot)

const blockToSow = () => findBlock({
    point: bot.entity.position,
    matching: (block) => {
        if (block && block.type === mcData.blocksByName.farmland.id) {
            const blockAbove = bot.blockAt(block.position.offset(0, 1, 0))
            return !blockAbove || blockAbove.type === 0
        }

        return false
    }
})

const blockToHarvest = () => findBlock({
    point: bot.entity.position,
    matching: (block) => {
        return block && block.type === mcData.blocksByName.wheat.id && block.metadata === 7
    }
})

bot.once('login', () => {
    pipe.run(
        blockToHarvest(),
        dig(),
        blockToSow(),
        equip(mcData.itemsByName.wheat_seeds.id, 'hand'),
        placeBlock(new Vec3(0, 1, 0)),
        restart(),
    )
})
