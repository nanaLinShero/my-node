var http = require('http');

http.createServer(function () {
    throw new Error('错误不会被捕获')
}).listen(3000)