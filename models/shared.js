var Product = require("./product");
var User = require("./user");
const Cart = require("./cart");

async function productsCount() {
  return Product.count((err, count) => {
    return count;
  });
}

async function usersCount() {
  return User.count((err, count) => {
    return count;
  });
}

async function getCartCount(id) {
  return Cart.count({ user: id }, (err, count) => {
    return count;
  });
}

async function getCard(id) {
  return Cart.find({user : id} , (err , result) => {
    console.log("result" , result);
    console.log(err);
    
    

    return result
  }).populate('product')
}
async function sumCart(cart) {
  return new Promise((resolve , regect) => {
    var total = 0 ;
    cart.forEach(c => {
      total += c.product.price * c.count
      
    });
    resolve(total) ;
  })
 

}

module.exports = {
  productsCount,
  usersCount,
  getCartCount , 
  getCard ,
  sumCart
};
