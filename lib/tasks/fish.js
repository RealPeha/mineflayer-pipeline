const Task = require('./base-task')

class Fish extends Task {
    run(result, pipeline) {
        pipeline.source.fish(err => {
            if (err) {
                return pipeline.error(err, this)
            }

            pipeline.next(result)
        })
    }
}

module.exports = () => new Fish()
