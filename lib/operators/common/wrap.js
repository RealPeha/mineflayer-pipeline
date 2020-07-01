const Operator = require('../base-operator')

class Wrap extends Operator {
    constructor(handler) {
        super()
        
        this.handler = handler
    }

    run(result, pipeline) {
        this.handler(result)

        pipeline.next(result, this)
    }
}

module.exports = (handler) => new Wrap(handler)
