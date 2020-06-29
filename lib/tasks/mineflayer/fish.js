const Task = require('../../task')

class Fish extends Task {
    run(result, pipeline) {
        pipeline.source.fish(err => {
            if (err) {
                throw new Error(err)
            }

            pipeline.next(result)
        })
    }
}

module.exports = () => new Fish()
