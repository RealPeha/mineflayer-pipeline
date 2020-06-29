const Task = require('../../task')
const { isFunction, isObject, isString } = require('../../utils')

class Chat extends Task {
    constructor(message) {
        super()

        this.message = isObject(message)
        	? JSON.stringify(message)
        	: isString(message)
        		? message
        		: message.toString()
    }

    run(result, pipeline) {
        const message = isFunction(this.message) ? this.message(result) : this.message
        pipeline.source.chat(message)

        pipeline.next(result)
    }
}

module.exports = (message) => new Chat(message)
