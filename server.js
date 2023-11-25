var express = require('express');
var enforce = require('express-sslify');
var exphbs  = require('express-handlebars');
var path = require('path');
var package = require('./package.json');

/* Setup the express app. */
var app = express();
var port = process.env.PORT || 9001;

/* This looks into the app folder that contains 
   all the code needed for this, and the package 
   specific to the app.
*/

app.use(express.static('./app'));

/* This will only be used in production, since we  
   most likely do not have a local SSL cert set 
   for localhost.
*/
if (process.env.NODE_ENV == 'production') {
	app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');

// This allows us to controll the apiUrl from the heroku config and
// support different testing branches.

app.locals.apiUrl = process.env.apiUrl || 'https://api.semperllc.com/';
app.locals.appVersion = package.version;

app.get('/login', function (req, res) {
	res.render('login');
});

app.get('/', function (req, res) {
	res.render('home');
});

app.listen(port);

console.log('Express app started on port ' + port);

/* Expose */
module.exports = app;
