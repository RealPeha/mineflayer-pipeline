const Task = require('../../task')

class Equip extends Task {
    constructor(item, destination) {
        super()

        this.item = item
        this.destination = destination
    }

    run(result, pipeline) {
        pipeline.source.equip(this.item, this.destination, err => {
            if (err) {
                throw new Error(err)
            }

            pipeline.next(result)
        })
    }
}

module.exports = (item, destination) => new Equip(item, destination)
