var express = require('express');
var router = express.Router();
var db = require('../helper/db');

/* GET products listing. */
router.get('/', function(req, res, next) {
    db.Product.find(function(err, result) {
      res.render('admin/products' , {products : result});
    })
  });
  
module.exports = router;
  