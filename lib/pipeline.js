const { isClass, isFunction, isNumber } = require('./utils')

class Pipeline {
    constructor(source = {}, { initialValue = null } = {}) {
        this.source = source
        this.tasks = []
        this.taskIndex = 0
        this.previousResult = null
        this.initialValue = initialValue
        this.isRunning = false

        this.stopCallback = null
    }

    run(...tasks) {
        const taskList = Array.isArray(tasks[0]) ? tasks[0] : tasks

        if (!Array.isArray(taskList)) {
            throw new Error('Tasks must be an array')
        }

        this.isRunning = true
        this.tasks = taskList.filter(Pipeline.validateTask)

        this.previousResult = null
        this.taskIndex = 0

        this.next(this.initialValue)
    }

    next(result = null, completedTask) {
        if (completedTask && completedTask.onSuccess) {
            const successResult = isFunction(completedTask.onSuccess)
                ? completedTask.onSuccess()
                : completedTask.onSuccess

            if (Array.isArray(successResult)) {
                const pipe = new Pipeline(this.source)

                pipe.onStop(() => this.next(result))

                return pipe.run(successResult)
            }
        }

        const task = this.tasks[this.taskIndex]

        if (!task) {
            return this.stop()
        }

        this.previousResult = result
        this.taskIndex += 1

        this.process(task)
    }

    process(task) {
        try {
            task.run(this.previousResult, this)
        } catch (err) {
            this.error(err, task)
        }
    }

    error(err, task) {
        if (!task.ignoreError) {
            console.log(`Error in task: ${task.constructor.name};`, err)
        }

        task.attempts += 1

        const errorResult = isFunction(task.onError)
            ? task.onError(err, this.previousResult, task)
            : task.onError

        if (Array.isArray(errorResult)) {
            const pipe = new Pipeline(this.source)

            pipe.onStop(() => this.next(this.previousResult))

            return pipe.run(errorResult)
        }

        if (isNumber(task.repeatAmount) && task.attempts < task.repeatAmount) {
            if (isNumber(task.intervalMs)) {
                setTimeout(() => this.process(task), task.intervalMs)
            } else {
                this.process(task)
            }

            return
        }

        if (task.ignoreError) {
            this.next(this.previousResult)
        }
    }

    stop() {
        this.isRunning = false

        isFunction(this.stopCallback) && this.stopCallback()
    }

    onStop(callback) {
        this.stopCallback = callback
    }

    static run(tasks, source = {}) {
        if (!Array.isArray(tasks)) {
            throw new Error('Tasks must be an array')
        }

        const pipe = new Pipeline(source)

        pipe.run(tasks)

        return pipe
    }

    static validateTask(task) {
        const taskIsClass = isClass(task)

        if (!taskIsClass) {
            console.log(`Task ${task && task.constructor.name} must be a class`)

            return false
        }

        const taskIsFunction = isFunction(task.run)

        if (!taskIsFunction) {
            console.log(`Task ${task.constructor.name} must have a 'run' method`)

            return false
        }

        return true
    }
}

module.exports = Pipeline
