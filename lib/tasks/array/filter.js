class Filter {
    constructor(handler) {
        this.handler = handler
    }

    run(result, pipeline) {
        const res = result.filter(this.handler)

        pipeline.next(res)
    }
}

module.exports = (handler) => new Filter(handler)
