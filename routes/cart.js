var express = require("express");
var Cart = require("../models/cart");
var router = express.Router();

router.get("/add/:id", (req, res) => {
  let id = req.session.passport.user._id;
  Cart.findOne({user : id , product : req.params.id} , (err, cart)=>{
    if (cart == null) {
      Cart.create({
        user: id,
        product: req.params.id,
      }).then((result) => {
        res.redirect("/");
      });
    }else{
      cart.count++;
      Cart.updateOne({user : id , product : req.params.id} , cart , (err , result)=>{
        res.redirect('/');
      })
    }
  })
  
});

module.exports = router;
