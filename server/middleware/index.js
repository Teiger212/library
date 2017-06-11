var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var passport = require('passport');

module.exports = function(app, express) {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, '../public')));
}