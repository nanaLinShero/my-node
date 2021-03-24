var express = require('express'), wsio = require('websocket.io')

var app = express.createServer()
var ws = wsio.attach(app)

var positions = {}, total = 0

app.use(express.static('public'))


ws.on('connection', function(socket) {
    socket.id = ++total
    socket.send(JSON.stringify(positions))
    socket.on('message', function(msg) {
        // console.log('   \033[96mgot: \033[39m ' + msg)
        // socket.send('pong')
        try {
            var pos = JSON.parse(msg)
        } catch(e) {
            return
        }
        positions[socket.id] = pos
        broadcast(JSON.stringify({type: 'position', pos: pos, id: socket.id}))
    })
    socket.on('close', function() {
        broadcast(JSON.stringify({type: 'disconnect', id: socket.id}))
        delete positions[socket.id]
    })
})

app.listen(3000)