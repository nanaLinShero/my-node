var connect = require('connect'), time = require('./request-time')
var server = connect.createServer()
server.use(connect.logger('div'))
server.use(time({time: 500}))

server.use(function(req, res, next) {
    if('/a' == req.url) {
        res.writeHead(200)
        res.end('Fast!')
    } else {
        next() // 让其他中间件能够处理请求，就要调用next，否则程序不会做任何事情
    }
})

server.use(function(req, res, next) {
    if('/b' == req.url) {
        setTimeout(function() {
            res.writeHead(200)
            res.end('Slow!')
        }, 1000)
    } else {
        next() // 让其他中间件能够处理请求，就要调用next，否则程序不会做任何事情
    }
})

server.listen(3000)