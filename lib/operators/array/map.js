const Operator = require('../base-operator')

class ArrayMap extends Operator {
    constructor(handler) {
        super()

        this.handler = handler
    }

    run(result, pipeline) {
        const res = result.map(this.handler)

        pipeline.next(res, this)
    }
}

module.exports = (handler) => new ArrayMap(handler)
