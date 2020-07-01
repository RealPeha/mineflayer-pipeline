const Task = require('./base-task')

class Once extends Task {
    constructor(event, handler) {
        super()

        this.event = event
        this.handler = handler
    }

    run(result, pipeline) {
        pipeline.source.once(this.event, this.handler)

        pipeline.next(result)
    }
}

module.exports = (event, handler) => new Once(event, handler)
