const isClass = (item) => {
    return !!item && item.constructor && item.constructor.name !== "Function" && item.constructor.name !== "Object"
}

const isFunction = (item) => typeof item === 'function'

const isNumber = (item) => typeof item === 'number'

module.exports = {
    isClass,
    isFunction,
    isNumber,
}
