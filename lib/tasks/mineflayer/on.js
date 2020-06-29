const Task = require('../../task')

class On extends Task {
    constructor(event, handler) {
        super()

        this.event = event
        this.handler = handler
    }

    run(result, pipeline) {
        pipeline.source.on(this.event, this.handler)

        pipeline.next(result)
    }
}

module.exports = (event, handler) => new On(event, handler)
