/** 
 * Module dependencies
 */

 var fs = require('fs')
// 输出文件列表
//  fs.readdir(__dirname, function(err,files) {
//     console.log(files)
//  })

 fs.readdir(process.cwd(), function(err,files) {
    console.log(' ')

    if(!files.length) {
        // \033[31m和\033[39m让文本呈现为红色
        return console.log('      \033[31m No files to show!\033[39m\n')
    }

    console.log('      Select which file or directory you want to see\n')

    function file(i) {
        // 元数据
        var filename = files[i]
        fs.stat(__dirname + '/' + filename, function(err, stat) {
            if(stat.isDirectory()) {
                console.log('     ' + i + '      \033[36m ' + filename + '/\033[39m\n')
            } else {
                console.log('     ' + i + '      \033[90m ' + filename + '\033[39m\n')
            }

            i++

            if(i == files.length) {
                console.log(' ')
                process.stdout.write('      \033[33mEnter your choice:\033[39m\n')
                // 等待用户输入
                process.stdin.resume()
                // 设置流编码为utf8，来支持特殊字符
                process.stdin.setEncoding('utf8')
            } else {
                file(i)
            }
        })
    }

    file(0)
 })