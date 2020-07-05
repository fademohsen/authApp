var express = require('express');

var router = express.Router();
var shared = require('../models/shared')

var stripe = require('stripe')('sk_test_51H05b6DAmIkPv4IVku6r4MqwrJ6PMT8NlY2MXNMW5EaI2mavJbHmfiSjfEoBdaQi4NcjHPbByJ1aJWKeQPrMaAlL00sDXBQjOP');

router.get('/' , async (req , res)=>{
  let id =   req.session.passport ? req.session.passport.user._id : null
;
    res.render("checkout", {
      cartCount: await shared.getCartCount(id),
      cart: await shared.getCard(id),
      total : await shared.getCard(id)
    });
 ;
 
})

router.post('/charge' , (req , res)=>{
   //  res.send(req.body);
   stripe.customers
   .create({
     name: 'Oday',
     email: 'dev.oday@hotmail.com',
     source: req.body.stripeToken
   })
   .then(customer =>
     stripe.charges.create({
       amount: 50000,
       currency: "usd",
       customer: customer.id
     })
   )
   .then(() => res.send("Yes"))
   .catch(err => console.log(err));
})

module.exports = router;