var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.id="hi";
  console.log(req.session);
  res.render('index', { title: req.session.id });
});

module.exports = router;
