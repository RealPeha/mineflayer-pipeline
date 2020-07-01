const Operator = require('../base-operator')

class Reduce extends Operator {
    constructor(handler, initialValue) {
        super()

        this.handler = handler
        this.initialValue = initialValue
    }

    run(result, pipeline) {
        let res

        if (this.initialValue === undefined) {
            res = result.reduce(this.handler)
        } else {
            res = result.reduce(this.handler, this.initialValue)
        }

        pipeline.next(res, this)
    }
}

module.exports = (handler, initialValue) => new Reduce(handler, initialValue)
