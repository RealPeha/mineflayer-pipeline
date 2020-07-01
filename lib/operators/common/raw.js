const Operator = require('../base-operator')

class Raw extends Operator {
    constructor(handler, props) {
        super()
        
        Object.assign(this, props)

        this.handler = handler
    }

    run(result, pipeline) {
        this.handler(result, pipeline, this)
    }
}

module.exports = (handler, props = {}) => new Raw(handler, props)
