const Pipeline = require('../../pipeline')

class Run {
    constructor(tasks) {
        this.tasks = tasks
    }

    run(result, pipeline) {
        const pipe = new Pipeline(pipeline.source)

        pipe.onStop(() => {
            console.log('stop')
            pipeline.next(result)
        })

        pipe.run(this.tasks)
    }
}

module.exports = (tasks) => new Run(tasks)
