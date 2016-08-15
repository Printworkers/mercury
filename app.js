var _ = require('lodash');
require('angular-animate');
require('angular-modal-service');
require('angular-input-masks');
require('ng-file-upload');

require('./bower_components/angular-moment/angular-moment.js');
// require('angular-sanitize');

var myApp = angular.module('myApp', [ 'ng-admin', 'angularMoment', 'schemaForm', 'ngFileUpload', 'ui.utils.masks', 'angular-keenio', 'angularModalService' ]);

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
require('./directives/header')(myApp);
// require('./directives/sendEmail')(myApp);
require('./directives/range')(myApp);
require('./directives/queue')(myApp);
require('./directives/reQueue')(myApp);

/* Configurations */
require('./configs/ng-admin')(myApp);
require('./configs/restangular')(myApp);
require('./configs/keen')(myApp);

/* Dashboard */
require('./extras/dashboard/userTypes')(myApp);
require('./extras/dashboard/last10UsersUpdated')(myApp);
require('./extras/dashboard/last10UsersCreated')(myApp);
require('./extras/dashboard/UserHomeOffices')(myApp);
require('./extras/dashboard/remoteAppStages')(myApp);
require('./extras/dashboard/last10AgentsCreated')(myApp);
require('./extras/dashboard/last10AgentsUpdated')(myApp);
require('./extras/dashboard/UserCalendar')(myApp);
require('./extras/dashboard/AgentCalendar')(myApp);
require('./extras/dashboard/ApplicationCalendar')(myApp);
require('./extras/dashboard/OrderCalendar')(myApp);
require('./extras/dashboard/UsersOnline')(myApp);

/* Extras */
require('./extras/json/json.js')(myApp);

/* User */
require('./extras/user/fmLinker')(myApp);
require('./extras/user/fmSync')(myApp);
require('./extras/user/queue')(myApp);
require('./extras/user/password')(myApp);
require('./extras/user/username')(myApp);
require('./extras/user/details')(myApp);
require('./extras/user/forms')(myApp);
require('./extras/user/manage')(myApp);
require('./extras/user/user-routes')(myApp);

require('./extras/agent/agent-routes')(myApp);
require('./extras/agent/details')(myApp);
require('./extras/agent/manage')(myApp);
require('./extras/agent/results')(myApp);

/* Talent */
require('./extras/talent/preview')(myApp);
require('./extras/talent/sync')(myApp);

/* Jobs */
require('./extras/job/sync')(myApp);
require('./extras/job/preview')(myApp);

/* Queue */
require('./extras/queue/manage')(myApp);
require('./extras/queue/queue-routes')(myApp);
require('./extras/queue/details')(myApp);

/* Template. */
require('./extras/template/sendEmail')(myApp);

/* Filemaker. */
require('./extras/filemaker')(myApp);

/* Resumes */
require('./extras/resume/page')(myApp);
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
