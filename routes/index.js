var express = require('express');
const dbcon = require("../config/db_con");
var router = express.Router();


/* GET home page. */
router.get('/', async function (req, res, next) {
  if (req.session.user) {
    var user_id = req.session.user.user_id;
    var result = await dbcon("SELECT user_1,user_2  FROM talk WHERE user_1 = ? OR user_2 = ?", [user_id, user_id]);

  }
  else
    res.redirect("/users/login");
  res.render('index', { user_id: user_id, result: result });
});

module.exports = router;
