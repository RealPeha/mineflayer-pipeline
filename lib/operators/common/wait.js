class Wait {
    constructor(timeoutMs) {
        this.timeoutMs = timeoutMs
    }

    run(result, pipeline) {
        setTimeout(() => pipeline.next(result), this.timeoutMs)
    }
}

module.exports = (timeoutMs) => new Wait(timeoutMs)
