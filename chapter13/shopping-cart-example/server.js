var express = require('express'), mysql = require('mysql'), config = require('./config')
// var db = mysql.createClient({
//     host: 'localhost',
//     database: 'cart-example'
// })
var db = mysql.createClient(config)

app = express.createServer()

app.set('view engine', 'jade')
app.set('views', __dirname + '/views')
app.set('views options', {layout: false})

app.get('/', function(req, res, next) {
    res.render('index')
})

app.post('/create', function(req, res, next) {
    
})

app.get('/item/:id', function(req, res, next) {
    res.render('item')
})

app.post('/item/:id/review', function(req, res, next) {
    
})

app.listen(3000, function() {
    console.log('  - listening on http://*:3000')
})