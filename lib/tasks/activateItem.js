const Task = require('./base-task')

class ActivateItem extends Task {
    run(result, pipeline) {
        pipeline.source.activateItem()

        pipeline.next(result)
    }
}

module.exports = () => new ActivateItem()
