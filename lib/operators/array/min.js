const Operator = require('../base-operator')

class Min extends Operator {
    constructor(handler) {
        super()

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

        pipeline.next(result[minIndex], this)
    }
}

module.exports = (handler) => new Min(handler)
