const { isFunction } = require('../../utils')

class Log {
    constructor(text) {
        this.text = text
    }

    run(result, pipeline) {
        if (isFunction(this.text)) {
            console.log(this.text(result, this))
        } else {
            console.log(this.text)
        }

        pipeline.next(result)
    }
}

module.exports = (text) => new Log(text)
