var express = require('express');
const dbcon = require("../config/db_con");
var router = express.Router();


router.get('/room_list', async function(req, res, next) {
    var room = await dbcon("SELECT user_id, room_name, room_peo FROM room",);
    res.render('room_list', { title: 'room_list', room : room});
  });
  
  router.get('/room_list/talk', async function(req, res, next) {
    user_1 = req.session.user.user_id;
    user_2 = req.query.user_id;
    console.log(user_1 + "\n" +user_2);
    if(user_1 == user_2)
    {
      res.redirect("/rooms/room_list");
    }
    else
    {
      if(user_1 > user_2)
      {
        var imsi;
        imsi = user_1;
        user_1 = user_2;
        user_2 = imsi;
      }
      await dbcon("INSERT INTO boardgame.talk(`user_1`, `user_2`) VALUES (?, ?);",[user_1,user_2]);
      res.redirect("/");
    }
  });
  
  router.get('/room_insert', function(req, res, next) {
    res.render('room_insert', { title: 'room_insert' });
  });
  
router.post('/room_insert', function(req, res, next){
    const{name,peo} = req.body;
    id = req.session.user.user_id;
    dbcon("INSERT INTO boardgame.room(`user_id`, `room_name`, `room_peo`) VALUES (?, ?, ?);",[id,name,peo]);
    res.redirect("/");
  });
module.exports = router;