const Operator = require('../base-operator')
const { isFunction } = require('../../utils')

class NextIf extends Operator {
    constructor(condition) {
        super()
        
        this.condition = condition
    }

    run(result, pipeline) {
        let res

        if (isFunction(this.condition)) {
            res = this.condition(result, pipeline)
        } else {
            res = !!this.condition
        }

        if (res) {
            pipeline.next(result, this)
        } else {
            pipeline.stop()
        }
    }
}

module.exports = (condition) => new NextIf(condition)
