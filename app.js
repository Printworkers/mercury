
var _ = require('lodash')
var myApp = angular.module('myApp', ['ng-admin', 'angular-keenio']);

myApp.constant('apiUrl', function() {
	var apiUrl = (window.location.origin.indexOf('localhost') == -1) ? 'https://api.semperllc.com/' : 'http://localhost:7001/';

	/* Comment this to make it look at the localhost. */
	apiUrl = 'https://api.semperllc.com/';

	return apiUrl;
}());

myApp.config(function(RestangularProvider, apiUrl) {

	RestangularProvider.setBaseUrl(apiUrl);
	RestangularProvider.setDefaultHeaders({'x-access-token': localStorage.getItem('semper-admin-token') }); 	
	RestangularProvider.setRestangularFields({ id: 'id' });

	RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response) {
		if (operation == "getList") {
			response.totalCount = data.total;
		}
		return data;
	});
	
	RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
		var extractedData = {};
		// .. to look for getList operations
		if (operation === "getList") {
			_.defaults(extractedData, data)
			// .. and handle the data and meta data
			extractedData = data.data;
		}
		else {
			extractedData = data;
		}

		return extractedData;
	});

	RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params, httpConfig) {
        if (operation == 'getList' ) {
            if (params._filters) {
                for (var filter in params._filters) {
                    params[filter] = params._filters[filter];
                }
                delete params._filters;
            }

            if (params._page)
            	params.page = params._page;

            if (params._perPage)
            	params.limit = params._perPage;

            if (params._sortField)
            	params.sortField = params._sortField;

           	if (params._sortDir)
           		params.sortDir = params._sortDir;

            delete params._page;
            delete params._perPage;
        }

        return { params: params, headers: headers };
    });

});

// custom controllers
var username = require('./controllers/usernameCtrl')(myApp)
var totalActiveAgents = require('./controllers/totalActiveAgentsCtrl')(myApp)

// instantialize directives
var dashboard = require('./directives/dashboard')(myApp)
var loginAsUser = require('./directives/loginAsUser')(myApp)
var previewJob = require('./directives/previewJob')(myApp)
var header = require('./directives/header')(myApp)
var sendEmail = require('./directives/sendEmail')(myApp)


myApp.config(['tbkKeenConfigProvider', function(tbkKeenConfigProvider) {
	var config = {
		projectId: "56ba2de259949a03c0080726",
		readKey: "0e0c7398282ccd8ff1f24e9822e038a2180560c2867890cd099ee10517c5279be8febb3c2de2700ea904b44281bc72b1c92e2a3b305c4d58c088d43f7426b2949dd146bf00d562739d252ed54c0e5c35d08586d051fad4d4b1fd2a19ac85b124"
	};

	tbkKeenConfigProvider.projectId(config.projectId).readKey(config.readKey);
}]);

myApp.config(['NgAdminConfigurationProvider', 'RestangularProvider', 'apiUrl', function(NgAdminConfigurationProvider, RestangularProvider, apiUrl) {
	
	var nga = NgAdminConfigurationProvider;
	var lookups = require('./lookups');

	/* create an admin application. */
	var admin = nga.application('Semper LLC Administrator').baseApiUrl(apiUrl); 
	var user = require('./entities/user')(nga, lookups)
	var agent = require('./entities/agent')(nga, user)
	var lookup = require('./entities/lookup')(nga);
	var job = require('./entities/job')(nga);
	var template = require('./entities/template')(nga, user);
	var homeoffice = require('./entities/homeoffice')(nga);
	var order = require('./entities/order')(nga, user);
	var application = require('./entities/application')(nga, user, order);
	// var resume = require('./entities/resume')(nga, user);
	var skill = require('./entities/skill')(nga);

	admin.addEntity(user);
	admin.addEntity(lookup);
	admin.addEntity(job);
	admin.addEntity(template);
	admin.addEntity(agent);
	admin.addEntity(homeoffice);
	admin.addEntity(order);
	admin.addEntity(application);
	admin.addEntity(skill);
	// admin.addEntity(resume);

	/* Dashboard */
	admin.dashboard(nga.dashboard()
		.template('<div dashboard></div>')
	);

	/* Header */
	admin.header('<div header></div>');

 	admin.menu(require('./menu')(nga, admin));

	nga.configure(admin);
}]);

require('./extras/user-manage.js')(myApp);
require('./extras/job-manage.js')(myApp);
require('./extras/filemaker.js')(myApp);

function sendPostController($stateParams) {
    this.postId = $stateParams.id;
    // notification is the service used to display notifications on the top of the screen
    // this.notification = notification;
};

sendPostController.inject = ['$stateParams'];
sendPostController.prototype.sendEmail = function() {
    this.notification.log('Email successfully sent to ' + this.email);
};

myApp.config(function ($stateProvider) {
    $stateProvider.state('send-post', {
        parent: 'main',
        url: '/sendPost/:id',
        params: { id: null },
        controller: sendPostController,
        controllerAs: 'controller',
        templateUrl: 'templates/sendEmail.html',
    });
});



