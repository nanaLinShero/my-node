var fs = require('fs')
var steam = fs.createReadStream('my-file.txt')
steam.on('data', function(chunk) {
    console.log('chunk:', chunk)
})
steam.on('end', function(chunk) {
    console.log('end:', chunk)
})

// 获取工作目录下的所有文件
var files = fs.readdirSync(process.cwd())

files.forEach(function(file) {
    // 监听.css后缀的文件
    if(/\.css/.test(file)) {
        fs.watchFile(process.cwd() + '/' + file, function() {
            console.log(' - ' + file + ' changed!')
        })
    }
})