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

router.get('/game_list', async function(req, res, next) {
  var game = await dbcon("SELECT game_name, game_cont, game_max, game_min  FROM game",);
  res.render('game_list', { title: 'game_list', game: game });
});

router.get('/game_insert', function(req, res, next) {
  res.render('game_insert', { title: 'game_insert' });
});

router.get('/room_list', async function(req, res, next) {
  var room = await dbcon("SELECT user_id, room_name, room_peo FROM room",);
  res.render('room_list', { title: 'room_list', room : room});
});

router.get('/room_insert', function(req, res, next) {
  res.render('room_insert', { title: 'room_insert' });
});
}

/* 포스트 동작 */
{
router.post('/join',function(req, res, next){
  const{id,pw} = req.body;
  dbcon("INSERT INTO boardgame.user(`user_id`, `user_pw`) VALUES (?, ?);",[id,pw]);
  res.redirect("/users/login");
});

router.post('/login', async function(req, res, next){
  const{id,pw} = req.body;
  
  var [result] = await dbcon("SELECT user_id FROM user WHERE user_id = ? AND user_pw = ?",[id,pw]);
  if(result)
  {
    req.session.user=result;
    res.redirect("/");
  }
  else{
    res.redirect("/users/login");
  }
});

router.post('/game_insert', function(req, res, next){
  const{name,cont,min,max} = req.body;
  dbcon("INSERT INTO boardgame.game(`game_name`, `game_cont`, `game_min`, `game_max`) VALUES (?, ?, ?, ?);", [name,cont,min,max]);
  res.redirect("/");
});

router.post('/room_insert', function(req, res, next){
  const{name,peo} = req.body;
  id = req.session.user.user_id;
  dbcon("INSERT INTO boardgame.room(`user_id`, `room_name`, `room_peo`) VALUES (?, ?, ?);",[id,name,peo]);
  res.redirect("/");
});

router.post('/game_list', function(req, res, next){
  id=req.session.user.user_id;
  const{game_name} = req.body;
  dbcon("INSERT INTO boardgame.user_like_game(`game_name`, `user_name`) VALUES (?, ?);",[game_name,id]);
  res.redirect("/");
});
}

module.exports = router;
