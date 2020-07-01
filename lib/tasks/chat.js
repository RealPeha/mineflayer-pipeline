const Task = require('./base-task')
const { isFunction, isObject, isString } = require('../utils')

class Chat extends Task {
    constructor(message) {
        super()

        this.message = Chat.convertMessage(message)
    }

    run(result, pipeline) {
        const message = isFunction(this.message) ? Chat.convertMessage(this.message(result)) : this.message
        console.log(message)

        pipeline.source.chat(message)
        pipeline.next(result)
    }

    static convertMessage(rawMessage) {
        if (isObject(rawMessage) || Array.isArray(rawMessage)) {
            return JSON.stringify(rawMessage)
        } else if (isFunction(rawMessage) || isString(rawMessage)) {
            return rawMessage
        } else {
            try {
                return rawMessage.toString()
            } catch {
                return rawMessage
            }
        }
    }
}

module.exports = (message) => new Chat(message)
