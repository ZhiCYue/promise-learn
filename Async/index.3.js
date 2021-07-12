/**
 * 异步调用的依赖处理
 */

const fs = require('fs');
const async = require('async');

async.waterfall([
    callback => {
        fs.readFile('./files/1.txt', 'utf-8', (err, content) => {
            callback(err, content);
        })
    },
    (arg1, callback) => {
        fs.readFile('./files/2.txt', 'utf-8', (err, content) => {
            callback(err, content);
        })
    },
    (arg1, callback) => {
        fs.readFile('./files/3.txt', 'utf-8', (err, content) => {
            callback(err, content);
        })
    }
], (err, result) => {
    // callback in callback.
    console.log(result);
});
