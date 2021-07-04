var argu = []
function fn () {
    var targrt = arguments[0]
    if (argu.length === [...arguments].length - 1) {
        return targrt.apply(this, argu)
    }
    argu = [...arguments].slice(1)
    return fn.bind(this, targrt, ...argu)
}

function add () {
    return [...arguments].reduce((i, item) => {
        return i + item
    })
}

console.log(fn(add, 1, 2, 3)(4, 5)())
