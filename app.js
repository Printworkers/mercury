var _ = require('lodash');
require('angular-animate');
require('angular-modal-service');
require('angular-input-masks');
require('ng-file-upload');
// require('angular-sanitize');

var myApp = angular.module('myApp', [ 'ng-admin', 'schemaForm', 'ngFileUpload', 'ui.utils.masks', 'angular-keenio', 'angularModalService' ]);

myApp.constant('apiUrl', function() {
	return 'https://api.semperllc.com/';
}());

/* Constants */
require('./constants.js')(myApp);

/* controllers */
require('./controllers/totalActiveAgentsCtrl')(myApp);
require('./controllers/usernameCtrl')(myApp);

/* Directives */
require('./directives/dashboard')(myApp);
require('./directives/loginAsUser')(myApp);
require('./directives/previewJob')(myApp);
require('./directives/header')(myApp);
require('./directives/sendEmail')(myApp);
require('./directives/range')(myApp);

/* Configurations */
require('./configs/restangular')(myApp);
require('./configs/ng-admin')(myApp);
require('./configs/keen')(myApp);

/* Extras */
require('./extras/user-manage.js')(myApp);
require('./extras/job-manage.js')(myApp);
require('./extras/filemaker.js')(myApp);
require('./extras/json/json.js')(myApp);

/* Resumes */
require('./extras/resume/reference')(myApp);
require('./extras/resume/education')(myApp);
require('./extras/resume/work')(myApp);
require('./extras/resume/document')(myApp);
require('./extras/resume/skills')(myApp);
require('./extras/resume/objectives')(myApp);

/* Services. */
require('./services/DataServices')(myApp);
require('./services/Modal')(myApp);

/* Filters. */
require('./filters/tel.js')(myApp);
require('./filters/titlecase.js')(myApp);
