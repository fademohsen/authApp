var express = require('express');
var router = express.Router();
var db = require('../helper/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.User.find(function(err , result) {
    res.render('admin/users' , {users : result})
  })
      
});

module.exports = router;
