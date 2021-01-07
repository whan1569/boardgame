var dbcon = (a, b) => {
    pool.getConnection((err, conn) => {
        if (err) {
          throw err;
        }
        let query = a;
        conn.query(query, [b], (error, result) => {
          if (error) {
            throw error;
          }
          conn.release();
        });
    });
    return result;
};