class Min {
    constructor(handler) {
        this.handler = handler || (value => value)
    }

    run(result, pipeline) {
        let min = Infinity
        let minIndex = -1

        result.forEach((item, index) => {
            const value = this.handler(item)

            if (value < min) {
                min = value
                minIndex = index
            }
        })

        pipeline.next(result[minIndex])
    }
}

module.exports = (handler) => new Min(handler)
