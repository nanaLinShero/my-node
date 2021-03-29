var config = require('./config'), mysql = require('mysql')
delete config.database // 数据库还未创建好，所以需要将config中的database字段删除
var db = mysql.createClient(config)


/**
 * 创建数据库
 */
db.query('CREATE DEATABASE IF NOT EXISTS `cart-example`')
db.query('USE `cart-example`')

/**
 * 创建表
 */
db.query('DROP TABLE IF EXISTS item')
db.query('CREATE TABLE item (' +
    'id INT(11) AUTO_INCREMENT,' +
    'title VARCHAR(255),' +
    'description TEXT,' +
    'created DATETIME,' +
    'PRIMARY KEY (ID))'
)
db.query('DROP TABLE IF EXISTS review')
db.query('CREATE TABLE review (' +
    'id INT(11) AUTO_INCREMENT,' +
    'item_id INT(11),' +
    'text TEXT,' +
    'stars INT(1),' +
    'created DATETIME,' +
    'PRIMARY KEY (id))'
)

/**
 * 关闭客户端
 */
db.end(function () {
    process.exit()
})