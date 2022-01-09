const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user-routes');
const driveRoutes = require('./routes/drives-routes');
const notifications = require('./routes/notifications-routes');
const chats = require('./routes/drivesChat-routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api', userRoutes.routes);
app.use('/api', driveRoutes.routes);
app.use('/api', notifications.routes);
app.use('/api', chats.routes);


module.exports = app;