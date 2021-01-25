var express = require('express');
const dbcon = require("../config/db_con");
var router = express.Router();


router.get('/game_list', async function (req, res, next) {
    var game = await dbcon("SELECT game_name, game_cont, game_max, game_min  FROM game",);
    res.render('game_list', { title: 'game_list', game: game });
});

router.get('/game_list/like', function (req, res, next) {
    user_id = req.session.user.user_id;
    game_name = req.query.game_name;
    dbcon("INSERT INTO boardgame.user_like_game(`game_name`, `user_id`) VALUES (?, ?);", [game_name, user_id]);
    res.redirect("/");
});

router.get('/game_insert', function (req, res, next) {
    res.render('game_insert', { title: 'game_insert' });
});

router.get('/game_like_list', async function (req, res, next) {
    user_id = req.session.user.user_id;
    var result = await dbcon("SELECT game_name, user_id FROM user_like_game WHERE user_id = ?", [user_id]);
    res.render('game_like_list', { title: 'game_like_list', game: result });
});

router.get('/game_like_list/del', async function (req, res, next) {
    user_id = req.session.user.user_id;
    game_name = req.query.game_name;
    var result = await dbcon("DELETE FROM boardgame.user_like_game WHERE game_name = ? AND user_id = ?", [game_name, user_id]);
    res.redirect("/games/game_like_list");
});

router.post('/game_insert', function (req, res, next) {
    const { name, cont, min, max } = req.body;
    dbcon("INSERT INTO boardgame.game(`game_name`, `game_cont`, `game_min`, `game_max`) VALUES (?, ?, ?, ?);", [name, cont, min, max]);
    res.redirect("/");
});

module.exports = router;