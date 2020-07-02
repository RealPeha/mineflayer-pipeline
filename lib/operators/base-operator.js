class Operator {
    constructor() {
        this.onSuccess = null
        this.onError = null

        this.ignoreError = false
    }

    try(callback) {
        this.onSuccess = callback

        return this
    }

    catch(callback = catchCallback) {
        this.onError = callback

        return this
    }

    next() {
        this.ignoreError = true

        return this
    }
}

module.exports = Operator
