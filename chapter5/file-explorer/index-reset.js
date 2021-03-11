/** 
 * Module dependencies
 */

// 定义快捷变量
 var fs = require('fs'), { stdin, stdout } = process
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

    var stats = [];
    function file(i) {
        // 元数据
        var filename = files[i]
        fs.stat(__dirname + '/' + filename, function(err, stat) {
            stats[i] = stat
            
            if(stat.isDirectory()) {
                console.log('     ' + i + '      \033[36m ' + filename + '/\033[39m\n')
            } else {
                console.log('     ' + i + '      \033[90m ' + filename + '\033[39m\n')
            }

            if(++i == files.length) {
                read()
            } else {
                file(i)
            }
        })
    }

    function read() {
        console.log(' ')
        stdout.write('      \033[33mEnter your choice:\033[39m\n')
        // 等待用户输入
        stdin.resume()
        // 设置流编码为utf8，来支持特殊字符
        stdin.setEncoding('utf8')
        stdin.on('data', option)
    }

    function option(data) {
        var filename = files[Number(data)]
        // if(!filename) {
        //     stdout.write('      \033[33mEnter your choice:\033[39m\n')
        // } else {
        //     stdin.pause()
        //     fs.readFile(__dirname + '/' + filename, 'utf8', function(err, data) {
        //         console.log(' ')
        //         console.log('\033[90m' + data.replace(/(.*)/g, '       $1') + '\033[39m')
        //     })
        // }
        // 判断文件夹并显示文件夹
        if(stats[Number(data)].isDirectory()) {
            fs.readdir(__dirname + '/' + filename, 'utf8', function(err, files) {
                console.log(' ')
                console.log('     (' + files.length + '  files)')
                files.forEach(function (file) {
                    console.log('         -      ' + file)
                })
                console.log(' ')
            })
        } else {
            fs.readFile(__dirname + '/' + filename, 'utf8', function(err, data) {
                console.log(' ')
                console.log('\033[90m' + data.replace(/(.*)/g, '       $1') + '\033[39m')
            })
        }
    }


    file(0)
 })