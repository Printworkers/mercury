
var _ = require('lodash');
var myApp = angular.module('myApp', ['ng-admin', 'angular-keenio']);

myApp.constant('apiUrl', function() {
	return 'https://api.semperllc.com/';
}());

/* controllers */
require('./controllers/totalActiveAgentsCtrl')(myApp)

// instantialize directives
require('./directives/dashboard')(myApp);
require('./directives/loginAsUser')(myApp);
require('./directives/previewJob')(myApp);
require('./directives/header')(myApp);
require('./directives/sendEmail')(myApp);

/* Setup the Configs for Angular setup. */
require('./configs/restangular')(myApp);
require('./configs/ng-admin')(myApp);
require('./configs/keen')(myApp);

require('./extras/user-manage.js')(myApp);
require('./extras/job-manage.js')(myApp);
require('./extras/filemaker.js')(myApp);

/* Filters. */
require('./filters/tel.js')(myApp);
require('./filters/titlecase.js')(myApp);