const Task = require('../../task')

class Equip extends Task {
    constructor(item, destination) {
        super()

        if (destination === undefined) {
            this.destination = item
        } else {
            this.item = item
            this.destination = destination
        }
    }

    run(result, pipeline) {
        pipeline.source.equip(this.item || result, this.destination, err => {
            if (err) {
                return pipeline.error(err, this)
            }

            pipeline.next(result)
        })
    }
}

module.exports = (item, destination) => new Equip(item, destination)
