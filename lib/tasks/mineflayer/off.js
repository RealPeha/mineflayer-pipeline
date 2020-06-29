const Task = require('../../task')

class Off extends Task {
    constructor(event, handler) {
        super()

        this.event = event
        this.handler = handler
    }

    run(result, pipeline) {
        pipeline.source.removeListener(this.event, this.handler)

        pipeline.next(result)
    }
}

module.exports = (event, handler) => new Off(event, handler)
