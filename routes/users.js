var express = require('express');
const dbcon = require("../config/db_con");
var router = express.Router();

/*페이지 이동*/
{
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'login' });
});

router.get('/join', function(req, res, next) {
  res.render('join', { title: 'join' });
});

router.get('/game_list', function(req, res, next) {
  res.render('game_list', { title: 'game_list' });
});

router.get('/game_insert', function(req, res, next) {
  res.render('game_insert', { title: 'game_insert' });
});

router.get('/room_list', function(req, res, next) {
  res.render('room_list', { title: 'room_list' });
});

router.get('/room_insert', function(req, res, next) {
  res.render('room_insert', { title: 'room_insert' });
});
}

router.post('/join',function(req, res, next){
  const{id,pw} = req.body;
  dbcon("INSERT INTO boardgame.user(`user_id`, `user_pw`) VALUES (?, ?);",[id,pw]);
  res.render('login', { title: 'login' });
});

router.post('/login', async function(req, res, next){
  const{id,pw} = req.body;
  var [result] = await dbcon(`SELECT user_id FROM user WHERE user_id = ? AND user_pw = ?`,[id,pw]);
  console.log("=====" + result);
  if(result)
  {
    res.render('index', { title: 'index' });
  }
  res.render('login', { title: 'login' });
});

module.exports = router;
