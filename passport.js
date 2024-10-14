const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

// Google api eklenmesi gerekiyor
passport.use(
  new GoogleStrategy(
    {
      clientID: "",
      clientSecret: "",
      callbackURL: "/auth/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Kullanıcıyı veritabanınızda arayın veya oluşturun
      return done(null, { ...profile, accessToken }); // Profil bilgilerini ve access token'ı döndür
    }
  )
);

// Kullanıcıyı oturumdan al
passport.serializeUser((user, done) => {
  done(null, user);
});

// Kullanıcıyı oturumdan çıkar
passport.deserializeUser((user, done) => {
  done(null, user);
});
