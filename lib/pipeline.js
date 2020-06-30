const { isClass, isFunction, isNumber } = require('./utils')

class Pipeline {
    constructor(source = {}, { initialValue = null } = {}) {
        this.source = source
        this.tasks = []
        this.taskIndex = 0
        this.previousResult = null
        this.initialValue = initialValue

        this.stopCallback = null
    }

    push(task) {
        const isValidTask = Pipeline.validateTask(task)

        if (isValidTask) {
            this.tasks.push(task)
        }

        return this
    }

    increaseIndex() {
        this.taskIndex += 1
    }

    decreaseIndex() {
        this.taskIndex -= 1
    }

    filterWrongTasks() {
        this.tasks = this.tasks.filter(Pipeline.validateTask)
    }

    run(...tasks) {
        if (Array.isArray(tasks[0])) {
            this.tasks = tasks[0]
        } else {
            this.tasks = tasks
        }

        this.filterWrongTasks()
        this.previousResult = null
        this.taskIndex = 0

        this.next(this.initialValue)
    }

    next(result = null) {
        const task = this.tasks[this.taskIndex]

        if (!task) {
            console.log('pipeline end')
            
            this.stop()

            return
        }

        this.previousResult = result
        this.increaseIndex()

        this.process(task)
    }

    process(task) {
        try {
            const result = task.run(this.previousResult, this)

            if (isFunction(task.onSuccess)) {
                task.onSuccess(result)
            }

            const boolResult = !!result

            if (boolResult) {
                if (isFunction(task.onTruthy)) {
                    task.onTruthy(result)
                }
            } else if (!boolResult) {
                if (isFunction(task.onFalsy)) {
                    task.onFalsy(result)
                }
            }
        } catch (err) {
            this.error(err, task)
        }
    }

    error(err, task) {
        console.log(err)
        
        task.attempts += 1

        if (isFunction(task.onError)) {
            task.onError(err)
        }

        if (isNumber(task.repeatAmount) && task.attempts < task.repeatAmount) {
            if (isNumber(task.intervalMs)) {
                setTimeout(() => this.process(task), task.intervalMs)
            } else {
                this.process(task)
            }
        }
    }

    onStop(callback) {
        this.stopCallback = callback
    }

    stop() {
        if (isFunction(this.stopCallback)) {
            this.stopCallback()
        }
    }

    static validateTask(task) {
        const taskIsClass = isClass(task)

        if (!taskIsClass) {
            console.log(`Task ${task && task.constructor.name} must be a class`)

            return false
        }

        const isValidTask = isFunction(task.run)

        if (!isValidTask) {
            console.log(`Task ${task.constructor.name} must have a 'run' method`)

            return false
        }

        return true
    }
}

module.exports = Pipeline
