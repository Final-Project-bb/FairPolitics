const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const passport = require('passport');
const passportSetup = require("./passport")
const bodyParser = require('body-parser');
const loginRoutes = require('./routes/login');
const postsRoutes = require('./routes/posts');
const pollsRoutes = require('./routes/polls');
const PORT = 4000;

const app = express();

app.use(cookieSession({ name: "session", keys: ["shai"], maxAge: 24 * 60 * 60 * 100 }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", methods: "GET,POST,PUT,DELETE", credentials: true }));
app.use(bodyParser.json());

app.use('/api', loginRoutes.routes);
app.use('/api', postsRoutes.routes);
app.use('/api', pollsRoutes.routes);


app.listen(PORT, () => console.log('App is listening on url http://localhost:' + PORT));


// const app = express();
const session = require('express-session');

app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

app.get('/', function(req, res) {
  res.render('pages/api');
});

// const port = 4002;
// app.listen(port , () => console.log('App listening on port ' + port));

/*  PASSPORT SETUP  */

var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.get('/connection/login/google/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));



passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

/*  Google AUTH  */
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/google/callback",
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/api/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/api/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/connection/login/google/success');
  });



module.exports = app;