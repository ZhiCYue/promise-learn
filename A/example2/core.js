const events = require('events');
const util = require('util');
const EventEmitter = events.EventEmitter;

var Promise = function () {
    EventEmitter.call(this);
}
util.inherits(Promise, EventEmitter);

Promise.prototype.then = function (fulfilledHandler, errorHandler, progressHandler) {
    if (typeof fulfilledHandler === 'function') {
        this.once('success', fulfilledHandler);
    }
    if (typeof errorHandler === 'function') {
        this.once('error', errorHandler);
    }
    if (typeof progressHandler === 'function') {
        this.on('progress', progressHandler);
    }
    return this;
}

// Promise 定义了回调方法，Deferred（即延迟对象） 则用于触发上面编写的回调函数。
var Deferred = function () {
    this.state = 'unfulfilled';
    this.promise = new Promise();
}

Deferred.prototype.resolve = function (obj) {
    this.state = 'fulfilled';
    this.promise.emit('success', obj);
}

Deferred.prototype.reject = function (err) {
    this.state = 'failed';
    this.promise.emit('error', err);
}

Deferred.prototype.progress = function (data) {
    this.promise.emit('progress', data);
}

Deferred.prototype.makeNodeResolver = function () {
    var self = this;
    return function (err, value) {
        if (err) {
            self.reject(err);
        } else if (arguments.length > 2) {
            self.resolve(arguments.slice(1));
        } else {
            self.resolve(value);
        }
    }
}

Deferred.prototype.all = function (promises) {
    var count = promises.length;
    var that = this;
    var results = [];

    promises.forEach(function (promise, i) {
        promise.then(data => {
            count --;
            results[i] = data;
            if (count === 0) {
                that.resolve(results);
            }
        }, err => {
            that.reject(err);
        })
    });
    
    return this.promise;
}

module.exports = {
    Promise,
    Deferred
}
