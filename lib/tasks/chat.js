const Task = require('./base-task')
const { isFunction, isObject, isString } = require('../utils')

class Chat extends Task {
    constructor(message) {
        super()

        if (isObject(message)) {
            this.message = JSON.stringify(message)
        } else if (isFunction(message) || isString(message)) {
            this.message = message
        } else {
            try {
                this.message = message.toString()
            } catch {
                this.message = message
            }
        }
    }

    run(result, pipeline) {
        const message = isFunction(this.message) ? this.message(result) : this.message
        pipeline.source.chat(message)

        pipeline.next(result)
    }
}

module.exports = (message) => new Chat(message)
