const { isFunction } = require('../../utils')

class NextIf {
    constructor(condition) {
        if (!isFunction(condition)) {
            throw new Error('Condition must be a function')
        }

        this.condition = condition
    }

    run(result, pipeline) {
        if (this.condition(result, pipeline)) {
            pipeline.next(result)
        }
    }
}

module.exports = (condition) => new NextIf(condition)
