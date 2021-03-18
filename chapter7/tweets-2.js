var http = require('http'), qs = require('querystring'), search = process.argv.slice(2).join(' ').trim()

if(!search.length) {
    return console.log('\n Usage:  node tweets <search term>\n')
}
console.log('\n searching for:  \033[96m' + search + '\033[39m\n')
// 该地址无法正常访问，应该是因为科学上网
http.get({
    host: 'search.twitter.com',
    path: '/search?' + qs.stringify({d: search})
}, function(res) {
    var body = ''
    res.setEncoding('utf8')
    res.on('data', function(chunk) {
        body += chunk
    })
    res.on('end', function() {
        console.log(body)
        var obj = JSON.parse(body)
        obj.results.forEach(function(tweet) {
            console.log('  \033[90m' + tweet.text + '\033[39m')
            console.log('  \033[94m' + tweet.from_user + '\033[39m')
            console.log('--')
        })
    })
})
// get方法无需在尾部调用end方法