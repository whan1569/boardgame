var express = require('express');
const dbcon = require("../config/db_con");
var router = express.Router();

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'login' });
});

router.get('/join', function (req, res, next) {
  res.render('join', { title: 'join' });
});


router.get('/logout', function (req, res, next) {
  req.session.destroy(function (err) {
  })
  res.redirect('/');
});

router.post('/join', function (req, res, next) {
  const { id, pw } = req.body;
  dbcon("INSERT INTO boardgame.user(`user_id`, `user_pw`) VALUES (?, ?);", [id, pw]);
  res.redirect("/users/login");
});

router.post('/login', async function (req, res, next) {
  const { id, pw } = req.body;

  var [result] = await dbcon("SELECT user_id FROM user WHERE user_id = ? AND user_pw = ?", [id, pw]);
  if (result) {
    req.session.user = result;
    res.redirect("/");
  }
  else {
    res.redirect("/users/login");
  }
});


module.exports = router;
