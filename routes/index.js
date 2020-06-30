var express = require("express");
var router = express.Router();
var passport = require("passport");
var jwt = require("jsonwebtoken");

var admin = require("firebase-admin");

var serviceAccount = require("../serviceAccountKey.json");

var db = require("../helper/db");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://appnotify-9296a.firebaseio.com",
});

/* GET home page. */
router.get("/dashboard", async function (req, res, next) {
  res.render("dashboard", {
    title: "index",
    usersCount: await db.usersCount(),
    productsCount: await db.productsCount(),
  });
});

/* GET login page. */
router.get("/login", function (req, res, next) {
  res.render("login", { title: "login" });
});

/* Post login page. */
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

/* GET register page. */
router.get("/register", function (req, res, next) {
  res.render("register", { title: "register" });
});

/* POST register page. */
router.post("/register", function (req, res, next) {
  db.User.create(req.body).then(function (result) {
    res.redirect("/");
  });
});

// router.use((req , res , next)=>{
//   console.log("req.user" , req.user);
//   res.locals.user = req.user;
//   next();
// })

/* GET table page. */
router.get("/table", function (req, res, next) {
  res.render("table", { title: "table" });
});

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email", "public_profile"] })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] }),
  function (req, res) {
    // The request will be redirected to Google for authentication, so
    // this function will not be called.
  }
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

router.post("/api/login", function (req, res) {
  if (req.body.username == "Oday" && req.body.password == "123456") {
    var token = jwt.sign({ firstName: "Oday", lastName: "Alqarra" }, "authApp");
    res.json({ token });
  } else {
    res.json("Not found your account");
  }
});

router.get("/notifications", (req, res) => {
  db.User.find(function (err, users) {
    res.render("notifications", { users: users });
  });
});

router.post("/sendNotification", (req, res) => {
  if (req.body.userId === "all") {
    admin.messaging().sendAll({ titel: req.body.title, body: req.body.text });
  } else {
    db.User.findOne({ _id: req.body.userId }, (err, user) => {
      console.log(user);

      //  admin.messaging().send({token : user.token , data : {titel : req.body.title , body : req.body.text}});
    });
  }
  res.send("notification sent");
});

router.post("/registerToken", (req, res) => {
  console.log("token", req.body.token);
  db.User.findById();
  users.push({ token: req.body.token });
});

router.get("/", (req, res) => {
  db.Product.find((err, products) => {
    res.render("products", { products });
  });
});

router.get("/product/:id", (req, res) => {
  db.Product.findById(req.params.id, (err, product) => {
    res.render("product", { product });
  });
});

module.exports = router;
