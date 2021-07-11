const fs = require('fs');
const { Deferred } = require('./core');

var readFile = function (file, encoding) {
    var deferred = new Deferred();
    fs.readFile(file, encoding, deferred.makeNodeResolver());
    return deferred.promise;
}

var promise1 = readFile('./1.txt', 'utf-8');
var promise2 = readFile('./2.txt', 'utf-8');
var deferred = new Deferred();
deferred.all([promise1, promise2]).then(results => {
    console.log(results);
}, err => {
    console.error(err);
})
