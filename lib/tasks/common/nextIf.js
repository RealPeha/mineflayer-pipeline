const { isFunction } = require('../../utils')

class NextIf {
    constructor(condition) {
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
            pipeline.next(result)
        } else {
            pipeline.stop()
        }
    }
}

module.exports = (condition) => new NextIf(condition)
