/**
 * 模块依赖
 */
var net = require('net')
/**
 * 追踪连接数
 */
var count = 0, users = {}
/**
 * 创建服务器
 */
var server = net.createServer(function (conn) {
    // console.log('\033[90m new connection!\033[39m')
    conn.setEncoding('utf8')
    var nickname
    conn.write(
        '\n > welcome to \033[92m node-chat\033[39m!' +
        '\n > ' + count + ' other people are connected at this time.' +
        '\n > peopel write your name and press enter:' 
    )
    count ++
    conn.on('data', function(data) {
        // console.log(data)
        // 接收到数据时，确保将\r\n（相当于按下回车键）清除
        data = data.replace('\r\n', '')
        // 接收到的第一份数据应当是用户输入的昵称
        if(!nickname) {
            if(users[data]) {
                
            }
        }
    })
    conn.on('close', function() {
        count --
    })
})
/**
 * 监听
 */
server.listen(3000, function() {
    console.log('\033[96m server listening on *:3000\033[39m')
})