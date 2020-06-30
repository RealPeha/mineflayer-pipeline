const Task = require('../../task')

class Consume extends Task {
    run(result, pipeline) {
        pipeline.source.consume(err => {
            if (err) {
                return pipeline.error(err, this)
            }

            pipeline.next(result)
        })
    }
}

module.exports = () => new Consume()
