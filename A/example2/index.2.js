const fs = require('fs');
const events = require('events');

// 改造后
var emitter = new events.EventEmitter();

emitter.on('step1', () => {
    fs.readFile('./files/1.txt', 'utf-8', function (err, data) {
        console.log(data);
        emitter.emit('step2', data);
    });
});

emitter.on('step2', () => {
    fs.readFile('./files/2.txt', 'utf-8', function (err, data) {
        console.log(data);
        emitter.emit('step3', data);
    });
});

emitter.on('step3', () => {
    fs.readFile('./files/3.txt', 'utf-8', function (err, data) {
        console.log(data);
        // end callback.
    });
});

emitter.emit('step1');