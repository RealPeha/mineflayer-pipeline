const Task = require('../../task')

class PlaceBlock extends Task {
    constructor(position) {
        super()

        this.position = position
    }

    run(result, pipeline) {
        pipeline.source.placeBlock(result, this.position, (err) => {
            if (err) {
                throw new Error(err)
            }

            pipeline.next(result)
        })
    }
}

module.exports = (position) => new PlaceBlock(position)
