const express = require("express");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
require("./passport");

const app = express();

app.use(
  session({
    secret: "your_secret_key", // Güvenli bir anahtar belirleyin
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.get("/", (req, res) => {
  res.send("<button><a href='/auth'>Login With Google</a></button>");
});

// Auth
app.get(
  "/auth",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// Auth Callback
app.get(
  "/auth/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/callback/success",
    failureRedirect: "/auth/callback/failure",
  })
);

// Success
app.get("/auth/callback/success", (req, res) => {
  if (!req.user) return res.redirect("/auth/callback/failure");

  // Access token'ı ekrana yazdır
  res.send(
    `Welcome ${req.user.displayName}. Your access token is: ${req.user.accessToken}`
  );
});

// Failure
app.get("/auth/callback/failure", (req, res) => {
  res.send("Error");
});

app.listen(4000, () => {
  console.log("Server Running on port 4000");
});
