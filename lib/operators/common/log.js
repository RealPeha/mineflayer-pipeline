const Operator = require('../base-operator')
const { isFunction } = require('../../utils')

class Log extends Operator {
    constructor(text) {
        super()
        
        this.text = text
    }

    run(result, pipeline) {
        if (isFunction(this.text)) {
            console.log(this.text(result, this))
        } else {
            console.log(this.text)
        }

        pipeline.next(result, this)
    }
}

module.exports = (text) => new Log(text)
