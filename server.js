var express = require('express');

/* Setup the express app. */
var app = express();
var port = process.env.PORT || 7001;

app.use(express.static('./'));

app.listen(port);

console.log('Express app started on port ' + port);

/* Expose */
module.exports = app;
