// const nextTick = (fn) => {
//     setTimeout(() => {
//         fn();
//     }, 0);
// }

class Promise {
    constructor(executor) {
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;
        this.onResolveCallback = [];
        this.onRejectCallback = [];

        let resolve = value => {
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                this.onResolveCallback.forEach(fn => fn());
            }
        };

        let reject = reason => {
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.reason = reason;
                this.onRejectCallback.forEach(fn => fn());
            }
        };

        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }

    then(onFulfilled, onReject) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onReject = typeof onReject === 'function' ? onReject : err => { throw err };

        const handleFulfilled = (promise2, resolve, reject) => {
            try {
                let x = onFulfilled(this.value);
                // 参数 promise2 是为了确保x 为对象时，需要链式调用
                resolvePromise(promise2, x, resolve, reject);
            } catch (err) {
                reject(err);
            }
        }

        const handleRejected = (promise2, resolve, reject) => {
            try {
                let x = onReject(this.reason);
                resolvePromise(promise2, x, resolve, reject);
            } catch (err) {
                reject(err);
            }
        }

        let promise2 = new Promise((resolve, reject) => {
            if (this.state === 'fulfilled') {
                setTimeout(() => {
                    handleFulfilled(promise2, resolve, reject)
                }, 0);
            }

            if (this.state === 'rejected') {
                setTimeout(() => {
                    handleRejected(promise2, resolve, reject)
                }, 0);
            }

            if (this.state === 'pending') {
                this.onResolveCallback.push(() => {
                    setTimeout(() => {
                        handleFulfilled(promise2, resolve, reject)
                    }, 0);
                });
                this.onRejectCallback.push(() => {
                    setTimeout(() => {
                        handleRejected(promise2, resolve, reject)
                    }, 0);
                })
            }
        });
        // 返回promise2 完成链式
        return promise2;
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    // 循环引用
    if (x === promise2) {
        return reject(new Error('Chaining cycle detected for promise'));
    }

    // 防止多次调用
    let called;

    if (x === null || (typeof x !== 'object' || typeof x !== 'function')) {
        resolve(x);
        return;
    }

    // 这里不处理 function 包含 then 属性的方法的场景
    // 如果考虑，则需要修改逻辑就和 object 一样
    if (typeof x === 'function') {
        resolve(x);
        return;
    }

    if (typeof x === 'object') {
        // A+ 规定，声明 then = x 的 then 方法
        let then = x.then;
        if (typeof then === 'function') {
            try {
                then.call(x, y => {
                    if (called) return;
                    called = true;
                    // resolve的结果依旧是promise 那就继续解析
                    resolvePromise(promise2, y, resolve, reject);
                }, err => {
                    if (called) return;
                    called = true;
                    reject(err);
                });
            } catch (err) {
                if (called) return;
                called = true;
                // 取then出错了那就不要在继续执行了
                reject(err);
            }
        } else {
            resolve(x);
        }
    }
}

module.exports = Promise;
