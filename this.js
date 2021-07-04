Function.prototype.myCall = function (context, ...arg) {
    context = context || window
    context.fn = this
    const result = context.fn(...arg)
    return result
}