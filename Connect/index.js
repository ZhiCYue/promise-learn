const connect = require('connect');

var app = connect(); 

app.use(function middleware1(req, res, next) {
    // middleware 1
    console.log('middleware 1');
    next();
});
app.use(function middleware2(req, res, next) {
    // middleware 2
    console.log('middleware 2');
    next();
});

app.use('/', function fooMiddleware(req, res, next) {
    res.end('Hello from Connect!\n');
});

app.listen(3000);
