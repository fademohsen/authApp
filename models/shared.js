var Product = require("./product");
var User = require("./user");
const Cart = require("./cart");
const Country = require("./country");
const City = require("./city");

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

async function getCountries() {
  return new Promise((resolve, reject) => {
    Country.find((err, result) => {
      resolve(result);
    });
  });
}
async function getCities(id) {
  return new Promise((resolve, reject) => {
    City.find({country : id} , (err, result) => {
      resolve(result);
    });
  });
}

async function getCart(id) {
  return Cart.find({ user: id }, (errr, result) => {
    console.log("result cart", result);
    return result;
  }).populate("product");
}

async function sumCart(cart) {
  return new Promise((resolve, reject) => {
    var total = 0;
    cart.forEach((c) => {
      total += c.product.price * c.count;
    });
    resolve(total);
  });
}

module.exports = {
  productsCount,
  usersCount,
  getCartCount,
  getCart,
  sumCart,
  getCountries,
  getCities,
};
