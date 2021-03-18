/**
 * 模块依赖
 */
var connect = require('connect'), users = require('./users')
var server = connect(
    /**
     * 引入logger、bodyParser、session中间件。
     * session中间件需要操作cookie，所以在session之前要先引入cookieParser中间件
     */
    connect.logger('dev'),
    connect.bodyParser(),
    connect.cookieParser(),
    connect.session({secret: 'my app secret'}),
    /**
     * 检查用户是否已经登录，如果没有登录则交给其他中间件处理
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    function(req, res, next) {
        if('/' == req.url && req.session.logged_in) {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end(
                'Welcome back, <b>' + req.session.name + '</b>.' + 
                '<a href="/logout">Logout</a>'
            )
        } else {
            next()
        }
    }, 
    /**
     * 展示一个登录表单
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    function(req, res, next) {
        if('/' == req.url && 'GET' == req.method) {
            res.writeHead(200, { 'Content-Type': 'text/html'})
            res.end([
                '<form action="/login" method="POST">',
                '<fieldset>',
                '<legend>Please log in</legend>',
                '<p>User: <input type="text" name="user"></p>',
                '<p>Password: <input type="password" name="password"></p>',
                '<button>Submit</button>',
                '</fieldset>',
                '</form>'
            ].join(' '))
        } else {
            next()
        }
    },
    /**
     * 检查登录表单的信息是否与用户凭证匹配，匹配则认为登录成功
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    function(req, res, next) {
        if('/login' == req.url && 'POST' == req.method) {
            res.writeHead(200)
            if(!users[req.body.user] || req.body.password != users[req.body.user].password) {
                res.end('Bad username/password')
            } else {
                req.session.logged_in = true
                req.session.name = users[req.body.user].name
                res.end('Authenticated!')
            }
        } else {
            next()
        }
    },
    /**
     * 处理登出
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    function(req,res, next) {
        if('/logout' == req.url) {
            req.session.logged_in = false
            res.writeHead(200)
            res.end('Logged out!')
        } else {
            next()
        }
    }
)

server.listen(3000)