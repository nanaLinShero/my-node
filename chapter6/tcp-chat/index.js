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
    console.log('\033[90m new connection!\033[39m')
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
                // 93是黄色
                conn.write('\033[93m> nickname already in use, try again:\033[39m')
                return
            } else {
                nickname = data
                users[nickname] = conn

                // 消息广播给所有加入聊天服务器的客户端
                for(var i in users) {
                    // 90是浅灰色
                    users[i].write('\033[90m > ' + nickname + ' joined the room\033[39m\n')
                }
            }
        } else {
            for(var i in users) {
                // 发送给除自己以外的其他客户端
                if(i != nickname) {
                    users[i].write('\033[96m > ' + nickname + ':\033[39m' + data + '\n')
                }
            }
        }
    })
    conn.on('close', function() {
        count --
        delete users[nickname]
    })
})
/**
 * 监听
 */
server.listen(3000, function() {
    console.log('\033[96m server listening on *:3000\033[39m')
})