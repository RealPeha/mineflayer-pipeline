class Task {
    constructor() {
        this.onSuccess = null
        this.onError = null
        this.onTruthy = null
        this.onFalsy = null

        this.intervalMs = null
        this.repeatAmount = null
        this.attempts = 0
    }

    try(callback) {
        this.onSuccess = callback

        return this
    }

    catch(callback) {
        this.onError = callback

        return this
    }

    true(callback) {
        this.onTruthy = callback

        return this
    }

    false(callback) {
        this.onFalsy = callback

        return this
    }

    repeat(amount) {
        this.repeatAmount = amount

        return this
    }

    interval(ms) {
        this.intervalMs = ms

        return this
    }
}

module.exports = Task
