const Operator = require('../base-operator')

class Jump extends Operator {
    constructor(taskIndex) {
        super()
        
        this.taskIndex = taskIndex
    }

    run(result, pipeline) {
        pipeline.taskIndex = this.taskIndex - 1

        pipeline.next(result, this)
    }
}

module.exports = (taskIndex = 0) => new Jump(taskIndex)
