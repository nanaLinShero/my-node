exports.name = 'john'
exports.data = 'this is some data'

var privateVaribale = 5
exports.getPrivate = function () {
    return privateVaribale
}