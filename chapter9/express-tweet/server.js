var express = require('express'), search = require('./search')
var app = express.createServer()

app.set('view engine', 'ejs')  // set修改默认配置
app.set('views', __dirname + '/views')
app.set('view options', { layout: false })  // optons参数所定义的选项，在渲染视图时，会传递到每个模版中

console.log(app.set('views'))  // 获取配置信息，可调用app.set方法传递对应要获取配置的标志

// 定义路由
app.get('/', function(req, res) {
    res.render('index')
})

app.get('/search', function(req, res) {
    search(req.query.q, function(err, tweets) {
        if(err) return next(err)
        res.render('search', { results: tweets, search: req.query.q})
    })
})

// 监听
app.listen(3000)