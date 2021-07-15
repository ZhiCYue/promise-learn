const fs = require('fs');
const Q = require('q');

// 两次读取文件，第二次读取依赖第一次读取的内容
var readFile = function (file, encoding) {
    var deferred = Q.defer();
    fs.readFile(file, encoding, function (error, text) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            deferred.resolve(text);
        }
    });
    return deferred.promise;
}

readFile(`${__dirname}/files/1.txt`, 'utf-8').then(function (data) {
    console.log(data);
    return readFile(`${__dirname}/files/2.txt`, 'utf-8');
}).then(function (file2) {
    console.log(file2);
});
