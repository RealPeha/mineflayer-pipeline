const Task = require('./base-task')

class Dig extends Task {
    run(result, pipeline) {
        pipeline.source.dig(result, err => {
            if (err) {
                return pipeline.error(err, this)
            }

            pipeline.next(result, this)
        })
    }
}

module.exports = () => new Dig()
