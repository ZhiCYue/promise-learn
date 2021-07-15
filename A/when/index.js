var when = require('when');
// var rest = require('rest');

var arr = when.map(getRemoteNumberList(), times10);
console.log(arr);
when.reduce(arr, sum)
    .done(function(result) {
        console.log(result);
    });

function getRemoteNumberList() {
    // Get a remote array [1, 2, 3, 4, 5]
    // return rest('http://example.com/numbers').then(JSON.parse);
    return [1, 2, 3, 4, 5];
}

function sum(x, y) { return x + y; }
function times10(x) {return x * 10; }