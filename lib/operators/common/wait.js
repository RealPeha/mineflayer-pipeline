const Operator = require('../base-operator')

class Wait extends Operator {
    constructor(timeoutMs) {
        super()
        
        this.timeoutMs = timeoutMs
    }

    run(result, pipeline) {
        setTimeout(() => pipeline.next(result, this), this.timeoutMs)
    }
}

module.exports = (timeoutMs) => new Wait(timeoutMs)
