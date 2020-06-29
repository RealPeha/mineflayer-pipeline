class Max {
    constructor(handler) {
        this.handler = handler || (value => value)
    }

    run(result, pipeline) {
        let max = -Infinity
        let maxIndex

        result.forEach((item, index) => {
            const value = this.handler(item)

            if (value > max) {
                max = value
                maxIndex = index
            }
        })

        pipeline.next(result[maxIndex])
    }
}

module.exports = (handler) => new Max(handler)
