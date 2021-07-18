// browser 或 node
const Promise = require('./index');

var p = new Promise((resolve, reject) => {
    resolve(12);
});

p.then(res => {
    console.log(res);
});
