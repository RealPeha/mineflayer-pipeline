class Value {
    constructor(value) {
        this.value = value
    }

    run(result, pipeline) {
        pipeline.next(this.value)
    }
}

module.exports = (value) => new Value(value)
