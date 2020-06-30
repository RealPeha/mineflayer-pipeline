const Task = require('../../task')

class Dig extends Task {
    run(result, pipeline) {
        pipeline.source.dig(result, err => {
            if (err) {
                throw new Error(err)
            }

            pipeline.next(result)
        })
    }
}

module.exports = () => new Dig()
