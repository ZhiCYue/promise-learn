const fs = require('fs');

// 改造前
fs.readFile('./files/1.txt', 'utf-8', function (err, data) {
    console.log(data);
    fs.readFile('./files/2.txt', 'utf-8', function (err, data) {
        console.log(data);
        fs.readFile('./files/3.txt', 'utf-8', function (err, data) {
            console.log(data);
        });
    });
});
