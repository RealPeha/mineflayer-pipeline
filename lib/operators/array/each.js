const Operator = require('../base-operator')

class Each extends Operator {
    constructor(handler) {
        super()

        this.handler = handler
    }

    run(result, pipeline) {
        result.forEach(this.handler)

        pipeline.next(result, this)
    }
}

module.exports = (handler) => new Each(handler)
