const Operator = require('../base-operator')

class Restart extends Operator {
    constructor (value) {
        super()
        
        this.value = value
    }

    run(result, pipeline) {
        pipeline.taskIndex = 0

        if (this.value === undefined) {
            pipeline.next(result, this)
        } else {
            pipeline.next(pipeline.initialValue, this)
        }
    }
}

module.exports = (value) => new Restart(value)
