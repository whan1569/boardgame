var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  a="hello";
  if(req.session.user)
  {
    a="hello  " + req.session.user.user_id;
  }
  else
    res.redirect("/users/login");
  res.render('index', { title:  a});
});

module.exports = router;
