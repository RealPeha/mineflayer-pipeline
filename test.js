const Pipeline = require('./')
const { log, wait } = require('./common')

const pipe = new Pipeline()

pipe.run(
    wait(1500).try(() => [
        log('Ha'),
        wait(1500),
        log('Ha-ha')
    ]),
    log('Test'),
    wait(1500),
    log('Good')
)
