class Promise {
    constructor(executor) {
        this.status = 'pending';
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];

        let resolve = value => {
            if (value instanceof Promise) return value.then(resolve, reject);
            setTimeout(() => {
                if (this.status === 'pending') {
                    this.status = 'fulfilled';
                    this.value = value;
                    this.onResolvedCallbacks.forEach(onFulfilled => onFulfilled(value));
                }
            })
        }

        let reject = reason => {
            setTimeout(() => {
                if (this.status === 'pending') {
                    this.status = 'rejected';
                    this.reason = reason;
                    this.onRejectedCallbacks.forEach(onRejected => onRejected(reason));
                }
            })
        }

        // 由于调用executor这个方法有可能异常，需要将捕获的异常reject出去
        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }
    
    then(onFulfilled = value => value, onRejected = reason => { throw reason }) {
        let promise2;

        if (this.status === 'fulfilled') {
            return (promise2 = new Promise((resolve, reject) => {
                // onFulfilled 异步执行
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolveExecutor(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                })
            }))
        }
        if (this.status === 'rejected') {
            return (promise2 = new Promise((resolve, reject) => {
                // onFulfilled 异步执行
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolveExecutor(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                })
            }))
        }
        if (this.status === 'pending') {
            return (promise2 = new Promise((resolve, reject) => {
                this.onResolvedCallbacks.push(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolveExecutor(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
                this.onRejectedCallbacks.push(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolveExecutor(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                })
            }))
        }
    }

    catch(onRejected) {
        this.then(null, onRejected);
    }
}

let resolveExecutor = (promise2, x, resolve, reject) => {

    let isThenCalled = false;
    if (promise2 === x) return reject(new TypeError('循环引用！！！'));

    if (x === null || (typeof x !== 'object' || typeof x !== 'function')) {
        resolve(x);
        return;
    }

    // x 是 promise
    if (x instanceof Promise) {
        if (x.status === 'pending') {
            x.then(y => {
                resolveExecutor(promise2, y, resolve, reject);
            }, reject)
        } else {
            x.then(resolve, reject)
        }
        return;
    }
    
    // x 为对象或方法
    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                let resolvePromise = y => {
                    if (isThenCalled) return;
                    isThenCalled = true;
                    resolveExecutor(promise2, y, resolve, reject);
                }
                let rejectPromise = r => {
                    if (isThenCalled) return;
                    isThenCalled = true;
                    reject(r);
                };
                // 如果 then 是一个函数，则使用x作为此参数调用它，第一个参数resolveExecutor
                then.call(x, resolvePromise, rejectPromise);
            } else {
                resolve(x);
            }
        } catch (e) {
            if (isThenCalled) return;
            isThenCalled = true;
            reject(e);
        }
        return;
    }
};

Promise.resolve = function (value) {
    return new Promise(resolve => {
        resolve(value);
    });
}

Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason);
    });
}

Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
        let len = promises.length;
        let resolveAry = [];
        let count = 0;
        for (let i = 0; i < len; i++) {
            promises[i].then(value => {
                resolveAry[i] = value;
                if (++count === len) resolve(resolveAry);
            }, reject)
        }
    });
}

Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        for (let i = 0, l = promises.length; i < l; i++) {
            promises[i].then(resolve, reject);
        }
    });
}

Promise.defer = Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}

module.exports = Promise;