const Operator = require('../base-operator')

class Value extends Operator {
    constructor(value) {
        super()
        
        this.value = value
    }

    run(result, pipeline) {
        pipeline.next(this.value, this)
    }
}

module.exports = (value) => new Value(value)
