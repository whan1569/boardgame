var express = require('express');
const pool = require("../config/dbConfig");
var router = express.Router();

/* GET users listing. */
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

router.post('/join',function(req, res, next){
  
});
module.exports = router;
