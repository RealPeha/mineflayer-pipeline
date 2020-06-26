class Goto {
    constructor(taskIndex) {
        this.taskIndex = taskIndex
    }

    run(result, pipeline) {
        pipeline.taskIndex = this.taskIndex

        pipeline.next(result)
    }
}

module.exports = (taskIndex = 0) => new Goto(taskIndex)
