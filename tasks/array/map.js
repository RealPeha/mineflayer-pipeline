class Map {
    constructor(handler) {
        this.handler = handler
    }

    run(result, pipeline) {
        const res = result.map(this.handler)

        pipeline.next(res)
    }
}

module.exports = (handler) => new Map(handler)
