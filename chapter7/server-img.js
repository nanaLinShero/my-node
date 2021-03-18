require('http').createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'image/jpg' })
    var stream = require('fs').createReadStream('photo.jpg')
    stream.on('data', function(data) {
        res.write(data)
    })
    stream.on('end', function() {
        res.end()
    })
}).listen(3000)