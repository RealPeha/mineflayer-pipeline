const Pipeline = require('../')
const { log, wait, nextIf, raw, value, jump } = require('../common')

// create task using raw operator
const increase = raw((result, pipeline) => pipeline.next(result + 1))

const pipe = new Pipeline()

pipe.run(
    value(0), // initial value in pipeline
    log('Start'), // just console.log
    increase, // call increase operator on current pipeline value (initial value in this case). value = value + 1
    log(res => `Value: ${res}`), // log previous operator result
    nextIf(result => result < 10), // if value < 10 then go to the next operator else stop pipeline
    wait(200), // wait 200 milliseconds
    jump(2), // go to second operator in this pipe - increase
)
