class Jump {
    constructor(taskIndex) {
        this.taskIndex = taskIndex
    }

    run(result, pipeline) {
        pipeline.taskIndex = this.taskIndex - 1

        pipeline.next(result)
    }
}

module.exports = (taskIndex = 0) => new Jump(taskIndex)
