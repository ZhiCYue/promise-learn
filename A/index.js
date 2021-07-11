const fs = require('fs');
const { Promise, Deferred } = require('./core');

// 改造前写法
fs.readFile('./1.txt', 'utf-8', (err, data) => {
    console.log(data);
});

// 改造后写法
var readFile = function (file, encoding) {
    var deferred = new Deferred();
    fs.readFile(file, encoding, deferred.makeNodeResolver());
    return deferred.promise;
}

readFile('./1.txt', 'utf-8').then(function(data) {
    // success
    console.log(data);
}, function(err) {
    // err
});
