const Pipeline = require('./pipeline')
const { log, wait, nextIf, raw, value, goto } = require('./tasks/common')

const increase = raw((result, pipeline) => pipeline.next(result + 1))

const obj = { number: 0 }

const pipe = new Pipeline(obj)

pipe.run(
    value(0),
    log('Start'),
    increase,
    log(res => `Result: ${res}`),
    nextIf(result => result < 10),
    wait(100),
    goto(1),
)

// bot example
// pipe.run(
//     getNearestBlock(61),
//     dig,
//     repeat(50),
//     restart()
// )
