var Promise = function () {
    this.queue = [];
    this.isPromise = true;
}

Promise.prototype.then = function (fulfilledHandler, errorHandler, progressHandler) {
    var handler = {};
    if (typeof fulfilledHandler === 'function') {
        handler.fulfilled = fulfilledHandler;
    }
    if (typeof errorHandler === 'function') {
        handler.error = errorHandler;
    }
    this.queue.push(handler);
    return this;
}

// Promise 定义了回调方法，Deferred（即延迟对象） 则用于触发上面编写的回调函数。
var Deferred = function () {
    this.promise = new Promise();
}

Deferred.prototype.resolve = function (obj) {
    var promise = this.promise;
    var handler;
    while ((handler = promise.queue.shift())) {
        if (handler && handler.fulfilled) {
            var ret = handler.fulfilled(obj);
            if (ret && ret.isPromise) {
                ret.queue = promise.queue;
                this.promise = ret;
                return;
            }
        }
    }
}

Deferred.prototype.reject = function (err) {
    var promise = this.promise;
    var handler;
    while ((handler = promise.queue.shift())) {
        if (handler && handler.error) {
            var ret = handler.error(err);
            if (ret && ret.isPromise) {
                ret.queue = promise.queue;
                this.promise = ret;
                return;
            }
        }
    }
}

Deferred.prototype.callback = function () {
    var that = this;
    return function (err, file) {
        if (err) {
            return that.reject(err);
        }
        that.resolve(file);
    }
}

module.exports = {
    Promise,
    Deferred
}
