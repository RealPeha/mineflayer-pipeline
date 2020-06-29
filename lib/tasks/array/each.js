class Each {
    constructor(handler) {
        this.handler = handler
    }

    run(result, pipeline) {
        result.forEach(this.handler)

        pipeline.next(result)
    }
}

module.exports = (handler) => new Each(handler)
