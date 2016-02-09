var express = require('express');
var enforce = require('express-sslify');

/* Setup the express app. */
var app = express();
var port = process.env.PORT || 9001;

app.use(express.static('./'));

if (process.env.NODE_ENV == 'production') {
	app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

app.listen(port);

console.log('Express app started on port ' + port);

/* Expose */
module.exports = app;
