class Raw {
    constructor(handler, props) {
        Object.assign(this, props)

        this.handler = handler
    }

    run(result, pipeline) {
        this.handler(result, pipeline, this)
    }
}

module.exports = (handler, props = {}) => new Raw(handler, props)
