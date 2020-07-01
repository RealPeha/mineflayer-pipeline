# Mineflayer-pipeline
Task management for the [mineflayer](https://github.com/PrismarineJS/mineflayer) bot using the [pipeline](https://en.wikipedia.org/wiki/Pipeline_(software)) concept

### Installation

```
$ yarn add mineflayer-pipeline
```
or
```
$ npm i mineflayer-pipeline -s
```

### Operators example
```javascript
const Pipeline = require('mineflayer-pipeline')
const { log, value, wait, raw } = require('mineflayer-pipeline/common')
const { filter, map } = require('mineflayer-pipeline/array')

const pipe = new Pipeline()

// Create custom operator using raw operator
const sum = () => raw((result, pipeline) => pipeline.next(result.reduce((a, b) => a + b)))

pipe.run(
    log('Start'),
    wait(500), // wait 500 ms
    value([5, -3, 7, 1, -4]),
    log(value => `Initial value: ${value.join(', ')}`),
    filter(n => n > 0),
    map(n => n**2),
    sum(),
    log(sum => `Sum: ${sum}`)
)
```

### Fibonacci example
```javascript
const Pipeline = require('mineflayer-pipeline')
const { log, value, raw, jumpIf } = require('mineflayer-pipeline/common')

const pipe = new Pipeline()

// Create custom operator using raw operator
const sum = () => raw((result, pipeline) => pipeline.next([...result, result[result.length - 1] + result[result.length - 2]]))

pipe.run(
    value([1, 1]), // set initial value
    sum(), // calc sum the last two numbers in array
    jumpIf(v => v.length < 15, 2), // go to the second operator (sum) if array length < 15
    log(sum => `Res: ${sum}`), // console.log result
)
```

### Mineflayer example
An example of using tasks for the bot, you can see here: [fisherman bot](https://github.com/RealPeha/mineflayer-pipeline/blob/master/examples/fisherman.js)
