const Task = require('../../task')

class FindBlock extends Task {
    constructor(options) {
        super()

        this.options = options
    }

    run(result, pipeline) {
        const block = pipeline.source.findBlock(this.options)

        pipeline.next(block)
    }
}

module.exports = (options) => new FindBlock(options)
