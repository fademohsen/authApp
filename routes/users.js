var express = require('express');
var router = express.Router();
var db = require('../helper/db')
/* GET users listing. */
router.get('/', function(req, res, next) {
  db.User.find(function(err , users) {
    res.render('admin/users', {users});
  })
});

module.exports = router;
