class Restart {
    constructor (value) {
        this.value = value
    }

    run(result, pipeline) {
        pipeline.taskIndex = 0

        if (this.value === undefined) {
            pipeline.next(result)
        } else {
            pipeline.next(pipeline.initialValue)
        }
    }
}

module.exports = (value) => new Restart(value)
