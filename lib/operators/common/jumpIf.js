const { isFunction } = require('../../utils')

class JumpIf {
    constructor(condition, taskIndex) {
        this.condition = condition
        this.taskIndex = taskIndex
    }

    run(result, pipeline) {
        let res

        if (isFunction(this.condition)) {
            res = this.condition(result, pipeline)
        } else {
            res = !!this.condition
        }

        if (res) {
            pipeline.taskIndex = this.taskIndex - 1

            pipeline.next(result)
        } else {
            pipeline.next(result)
        }
    }
}

module.exports = (condition, taskIndex = 0) => new JumpIf(condition, taskIndex)
