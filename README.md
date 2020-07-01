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
An example of using tasks for the mineflayer bot, you can see here: [fisherman bot](https://github.com/RealPeha/mineflayer-pipeline/blob/master/examples/fisherman.js)

### Available operators
This is just a list of available operators. Description and examples of use will be later

```javascript
const commonOperators = require('mineflayer-pipeline/common')
```

- value
- wait
- nextIf
- repeat
- restart
- jump
- jumpIf
- raw
- wrap
- run

```javascript
const arrayOperators = require('mineflayer-pipeline/array')
```

- each
- filter
- map
- max
- min
- reduce

### Available tasks
This is just a list of available task operators for the bot. Now they are few, but their creation is very simple and now I am not focused on this.

```javascript
const tasks = require('mineflayer-pipeline/tasks')
```

- activateItem
- chat
- consume
- dig
- equip
- findBlock
- fish
- off
- on
- once
- placeBlock
