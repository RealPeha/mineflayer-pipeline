class Repeat {
    constructor(amount) {
        this.amount = amount
        this.currentAmount = 0
    }

    run(result, pipeline) {
        if (this.currentAmount < this.amount) {
            this.currentAmount += 1
            pipeline.next()
        }
    }
}

module.exports = (amount) => new Repeat(amount)
