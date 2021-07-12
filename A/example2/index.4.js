const fs = require('fs');
const { Deferred } = require('./core');

// smooth(fs.readFile);
var smooth = function (method) {
    return function () {
        var deferred = new Deferred();
        var args = Array.prototype.slice.call(arguments, 0);
        args.push(deferred.callback());
        method.apply(null, args);
        return deferred.promise;
    }
}

// 这里定义 readFile1、readFile2 主要便于理解两次读取的依赖
// var readFile1 = smooth(fs.readFile);
// var readFile2 = smooth(fs.readFile);

var readFile = smooth(fs.readFile);
readFile('./files/1.txt', 'utf-8').then(data => {
    return readFile('./files/2.txt', 'utf-8');
}).then(data => {
    console.log(data);
})
