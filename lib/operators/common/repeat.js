const Operator = require('../base-operator')

class Repeat extends Operator {
    constructor(amount) {
        super()
        
        this.amount = amount
        this.currentAmount = 0
    }

    run(result, pipeline) {
        if (this.currentAmount < this.amount) {
            this.currentAmount += 1
            pipeline.next(result, this)
        }
    }
}

module.exports = (amount) => new Repeat(amount)
