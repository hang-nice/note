function fn () {
    return next => (a, b) => {
        console.log(1)
        return 2
    }
}


console.log(fn()()())