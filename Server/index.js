const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const loginRoutes = require('./routes/login');
const discussionsRoutes = require('./routes/discussions');
const pollsRoutes = require('./routes/polls');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api', loginRoutes.routes);
app.use('/api', discussionsRoutes.routes);
app.use('/api', pollsRoutes.routes);

module.exports = app;