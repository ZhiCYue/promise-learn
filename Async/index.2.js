/**
 * 异步的并行执行
 */

const fs = require('fs');
const async = require('async');

async.parallel([
    callback => {
        fs.readFile('./files/1.txt', 'utf-8', callback);
    },
    callback => {
        fs.readFile('./files/2.txt', 'utf-8', callback);
    }
], (err, results) => {
    // [ 'file1.', 'file2.' ]
    console.log(results);
})