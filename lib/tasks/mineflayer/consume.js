const Task = require('../../task')

class Consume extends Task {
    run(result, pipeline) {
        pipeline.source.consume(err => {
            if (err) {
                throw new Error(err)
            }

            pipeline.next(result)
        })
    }
}

module.exports = () => new Consume()
