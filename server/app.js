const express = require('express');
var app = express();

// connect to db
require('./config/dbConnection').connect();

// set up middleware
require('./middleware')(app, express);

// app routes
var index = require('./routes/');
var api = require('./routes/api/');

app.use('/', index);
app.use('/api', api);

module.exports = app;
