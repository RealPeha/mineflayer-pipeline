const Operator = require('../base-operator')

class Filter extends Operator {
    constructor(handler) {
        super()

        this.handler = handler
    }

    run(result, pipeline) {
        const res = result.filter(this.handler)

        pipeline.next(res, this)
    }
}

module.exports = (handler) => new Filter(handler)
