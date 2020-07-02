const Operator = require('../base-operator')
const Pipeline = require('../../pipeline')

class Run extends Operator {
    constructor(tasks) {
        super()

        this.tasks = tasks
    }

    run(result, pipeline) {
        const pipe = new Pipeline(pipeline.source)

        pipe.onStop(() => pipeline.next(result, this))

        pipe.run(this.tasks)
    }
}

module.exports = (tasks) => new Run(tasks)
