class Operator {
    constructor() {
        this.onSuccess = null
        this.onError = null
    }

    try(callback) {
        this.onSuccess = callback

        return this
    }

    catch(callback = catchCallback) {
        this.onError = callback

        return this
    }
}

module.exports = Operator
