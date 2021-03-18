var request = require('superagent')
request.post('http://twitter.com/search.json')
    .send({q: 'justin bieber'})
    .end()