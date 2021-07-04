

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTE = 'rejected'

class MyPromise {
    constructor(executor) {
        try {
            executor(this.resolve, this.reject)
        } catch (error) {
            this.reject(err)
        }
    }
    status = PENDING
    onFulfilledCallbacks = []
    onRejectedCallbacks = []
    resolve = (value) => {
        if (this.state === PENDING) {
            this.status = FULFILLED
            this.value = value
        }
    }
    reject = (reason) => {
        if (this.status === PENDING) {
            this.status = REJECTE
            this.reason = reason
        }
    }

    then = (onFulfilled, onRejected) => {
        const realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        const realOnRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
        const promise2 = new MyPromise((resolve, reject) => {
            const fulfilledMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        const x = realOnFulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            const rejectedMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        const x = realOnRejected(this.reason)
                        resolvePromise(promise2, x, resolve, rejcet);
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            if (this.status === FULFILLED) {
                fulfilledMicrotask()
            } else if (this.status === REJECTE) {
                rejectedMicrotask()
            } else if (this.status === PENDING) {
                this.onFulfilledCallbacks.push(fulfilledMicrotask)
                this.onRejectedCallbacks.push(fulfilledMicrotask)
            }
        })
        return promise2;
    }
    static resolve (parameter) {
        if (parameter instanceof MyPromise) {
            return parameter
        }
        return new MyPromise(resolve => {
            resolve(parameter)
        })
    }
    static reject (reason) {
        return new MyPromise((resolve, reject) => {
            reject(reason)
        })
    }

}

function resolvePromise (promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if (x instanceof MyPromise) {
        x.then(resolve, reject)
    } else {
        resolve(x)
    }
}