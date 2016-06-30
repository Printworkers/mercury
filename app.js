var _ = require('lodash');
require('angular-animate');
require('angular-modal-service');
require('angular-input-masks');
require('ng-file-upload');
// require('angular-sanitize');

var myApp = angular.module('myApp', [ 'ng-admin', 'schemaForm', 'ngFileUpload', 'ui.utils.masks', 'angular-keenio', 'angularModalService' ]);

myApp.constant('FMApiUrl', 'http://71.11.2.114/Semper');

myApp.constant('apiUrl', function() {
	return window.apiUrl || 'https://api.semperllc.com/';
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
require('./directives/queue')(myApp);
require('./directives/reQueue')(myApp);

/* Configurations */
require('./configs/ng-admin')(myApp);
require('./configs/restangular')(myApp);
require('./configs/keen')(myApp);

/* Extras */
require('./extras/user-manage.js')(myApp);
require('./extras/job-manage.js')(myApp);
require('./extras/filemaker.js')(myApp);
require('./extras/json/json.js')(myApp);

require('./extras/user/fmLinker')(myApp);
require('./extras/user/fmSync')(myApp);
require('./extras/user/queue')(myApp);
require('./extras/user/password')(myApp);
require('./extras/user/username')(myApp);

/* Resumes */
require('./extras/resume/reference')(myApp);
require('./extras/resume/education')(myApp);
require('./extras/resume/work')(myApp);
require('./extras/resume/document')(myApp);
require('./extras/resume/skills')(myApp);
require('./extras/resume/objectives')(myApp);

require('./extras/user/agents')(myApp);

/* Services. */
require('./services/DataServices')(myApp);
require('./services/Modal')(myApp);

/* Filters. */
require('./filters/tel.js')(myApp);
require('./filters/titlecase.js')(myApp);
