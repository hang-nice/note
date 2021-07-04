function fn (num) {
    if (num <= 0) {
        return num
    }
    return num + fn(num - 1)

}
console.log(fn(100))


