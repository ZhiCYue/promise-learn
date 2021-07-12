const fs = require('fs');
const { Deferred } = require('./core');

// 两次读取文件，第二次读取依赖第一次读取的内容
var readFile1 = function (file, encoding) {
    var deferred = new Deferred();
    fs.readFile(file, encoding, deferred.callback());
    return deferred.promise;
}

var readFile2 = function (file, encoding) {
    var deferred = new Deferred();
    fs.readFile(file, encoding, deferred.callback());
    return deferred.promise;
}

readFile1('./files/1.txt', 'utf-8').then(function (file1) {
    return readFile2('./files/2.txt', 'utf-8');
}).then(function (file2) {
    console.log(file2);
});
