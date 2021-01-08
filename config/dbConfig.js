const mysql = require('mysql');
const config ={
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'boardgame'
}
var pool = mysql.createPool(config);

module.exports = pool;