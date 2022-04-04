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


module.exports = app;