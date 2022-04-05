const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const connection = require("./lib/db");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/google/callback",
      passReqToCallback: true
    },
    // function(accessToken, refreshToken, profile, cb) {
    function ( req , res, accessToken, refreshToken, profile, done) {
      console.log(req)
      process.nextTick(function () {
        connection.query("SELECT * FROM social_media WHERE gmail = "+ JSON.stringify(profile.emails[0].value), (err, user) => {
          if (err) {
            return done(err);
          } else if (user) {
            // connection query that return the user_details by social_media's user_id
            console.log("exist")
            console.log({ gmail: profile.emails[0].value })
            // res.status(200).send({ gmail: profile.emails[0].value });
            return done(null, user);
          } else {
            console.log("not exist")
            let newUser = {
              gmail: profile.emails[0].value,
              google_id: profile.id,
            };
            console.log(newUser)
              // res.status(200).send({ newUser });
              return done(null, user);
          }
          
        });

      })
      // done(null, user);
    }
  )
);

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_APP_ID,
//       clientSecret: process.env.FACEBOOK_APP_SECRET,
//       callbackURL: "/api/facebook/callback", // need to change
//     },
//     function(accessToken, refreshToken, profile, cb) {
//         User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//           return cb(err, user);
//         });
//     }
//   )
// );

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // console.log("#############user");
  // console.log(user);

  connection.query("SELECT * FROM social_media WHERE google_id = "+user[0].google_id, (err, rows) => {
    if (err) {
      console.log(err);
      return done(null, err);
    }
    // console.log(rows);
    done(null, user);
  });
});
