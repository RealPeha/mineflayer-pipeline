class Wrap {
    constructor(handler) {
        this.handler = handler
    }

    run(result, pipeline) {
        this.handler(result)

        pipeline.next(result)
    }
}

module.exports = (handler) => new Wrap(handler)
