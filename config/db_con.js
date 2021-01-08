
const pool = require("./dbConfig");
var dbcon = (a, b) => new Promise(function(resolve) {
    pool.getConnection((err, conn) => {
        if (err) {
          throw err;
        }
        let query = a;
        conn.query(query, b, (error, result) => {
          if (error) {
            throw error;
          }
          conn.release();
          resolve(result);
        });
    });
});

module.exports = dbcon;