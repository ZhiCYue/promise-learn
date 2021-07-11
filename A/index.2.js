const fs = require('fs');
const Q = require('q');

var readFile = function (file, encoding) {
    var deferred = Q.defer();
    fs.readFile(file, encoding, deferred.makeNodeResolver());
    return deferred.promise;
}

readFile('./1.txt', 'utf-8').then(data => {
    // success case
    console.log(data);
}, err => {
    // fail case
    console.log(err);
});
