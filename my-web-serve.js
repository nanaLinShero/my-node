var http = require('http');  // require用来载入模块和系统api
var serv = http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html'});
    res.end('<marquee>Smashing Node!</marquee>');
});
serv.listen(3000);