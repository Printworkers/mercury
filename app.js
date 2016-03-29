// global.jQuery = require('./bower_components/jquery/dist/jquery.js');

var _ = require('lodash');

// require('./vendor/ng-admin.js');
require('./bower_components/angular-animate/angular-animate.min.js');
require('./bower_components/angular-modal-service/dst/angular-modal-service.min.js');

var myApp = angular.module('myApp', ['ng-admin', 'angular-keenio', 'angularModalService']);

myApp.constant('apiUrl', function() {
	return 'https://api.semperllc.com/';
}());

/* controllers */
require('./controllers/totalActiveAgentsCtrl')(myApp);
var username = require('./controllers/usernameCtrl')(myApp);

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
require('./extras/json/json.js')(myApp);

/* Filters. */
require('./filters/tel.js')(myApp);
require('./filters/titlecase.js')(myApp);