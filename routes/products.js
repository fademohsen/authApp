var express = require('express');
var router = express.Router();
var Product = require('../models/product');

/* GET products listing. */
router.get('/', function(req, res, next) {
    Product.find(function(err, result) {
      res.render('admin/products' , {products : result});
    })
  });
  
module.exports = router;
  