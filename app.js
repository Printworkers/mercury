
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

var updateHeader;

// custom controllers
myApp.controller('username', ['$scope', '$window', function($scope, $window) { // used in header.html

	$scope.username =	'test';
}]);

myApp.controller('totalActiveAgents', ['$scope', '$window', '$http', function($scope, $window, $http, apiUrl) { // used in header.html
	$http.get(apiUrl + 'agent', {headers: {'x-access-token': localStorage.getItem('semper-admin-token') }}).then(function (response) {
		$scope.today = response.data.data.length
	})
}]);

// myApp.controller('dashboard', ['scope', '$http', function($scope, $html){
// 	$scope.appCount = 123
// }]);

// var loginControllerTemplate =
// 		'<div class="row"><div class="col-lg-12">' +
// 			'<ma-view-actions><ma-back-button></ma-back-button></ma-view-actions>' +
// 			'<div class="page-header">' +
// 				'<h1>Login</h1>' +
// 				'<p class="lead"></p>' +
// 			'</div>' +
// 		'</div></div>' +
// 		'<div class="row">' +
// 			'<div class="col-lg-5"><input type="text" size="10" ng-model="controller.email" class="form-control" placeholder="name@example.com"/></div>' +
// 			'<div class="col-lg-5"><input type="password" size="10" ng-model="controller.password" class="form-control" /></div>' +
// 			'<div class="col-lg-5"><a class="btn btn-default" ng-click="controller.login()">Send</a></div>' +
// 		'</div>';

// myApp.config(['$stateProvider', function ($stateProvider) {
// 	$stateProvider.state('send-post', {
// 		url: '/login',
// 		controller: loginController,
// 		controllerAs: 'controller',
// 		template: loginControllerTemplate
// 	});
// }]);

myApp.config(['tbkKeenConfigProvider', function(tbkKeenConfigProvider) {
	var config = {
		projectId: "56ba2de259949a03c0080726",
		readKey: "0e0c7398282ccd8ff1f24e9822e038a2180560c2867890cd099ee10517c5279be8febb3c2de2700ea904b44281bc72b1c92e2a3b305c4d58c088d43f7426b2949dd146bf00d562739d252ed54c0e5c35d08586d051fad4d4b1fd2a19ac85b124"
	};

	tbkKeenConfigProvider.projectId(config.projectId).readKey(config.readKey);
}]);

myApp.directive('dashboard', function() {
	return {
		templateUrl: 'dashboard.html'
	};
});

// function loginController($http, notification, $location) {
// 	// notification is the service used to display notifications on the top of the screen
// 	this.notification = notification;
// 	this.$http = $http;
// 	this.$location = $location
// };

// loginController.inject = ['$http', 'notification', '$location'];
// loginController.prototype.login = function() {
// 	// $http.post('http://semperllc.herokuapp.com/user/authenticate', {

// 	// })
// 	updateHeader()
// 	this.$location.path('/dashboard');
// 	this.notification.log('Successfully logged in as ' + this.email);
// };

// myApp.run(['Restangular', '$location', function(Restangular, $location){
	// ==== CODE TO DO 401 NOT LOGGED IN CHECKING
	//This code will intercept 401 unauthorized errors returned from web requests.
	//On default any 401 will make the app think it is not logged in.
	// Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {
	// 	if(response.status === 403){
	// 		$location.path('/login');
	// 		return false;
	// 	}
	// });
// }]);

myApp.config(['NgAdminConfigurationProvider', 'RestangularProvider', 'apiUrl', function(NgAdminConfigurationProvider, RestangularProvider, apiUrl) {
	
	var nga = NgAdminConfigurationProvider;
	var lookups = require('./lookups');

	/* create an admin application. */
	var admin = nga.application('Semper LLC Administrator').baseApiUrl(apiUrl); 
	var user = require('./entities/user')(nga, lookups)
	var agent = require('./entities/agent')(nga, user)
	var lookup = require('./entities/lookup')(nga)
	var job = require('./entities/job')(nga)
	var template = require('./entities/template')(nga, user)
	var homeoffice = require('./entities/homeoffice')(nga)
	var order = require('./entities/order')(nga, user)
	var application = require('./entities/application')(nga, user, order)
	var resume = require('./entities/resume')(nga, user)

	admin.addEntity(user);
	admin.addEntity(lookup);
	admin.addEntity(job);
	admin.addEntity(template);
	admin.addEntity(agent);
	admin.addEntity(homeoffice);
	admin.addEntity(order);
	admin.addEntity(application);
	admin.addEntity(resume);

	/* Dashboard */
	admin.dashboard(nga.dashboard()
		.template('<div dashboard></div>')
	);

	/* Header */
	admin.header('<div header></div>');

	nga.configure(admin);
}]);

myApp.directive('header', function() {
	return {
		templateUrl: 'header.html',
		controller: function($scope, Restangular) {
			Restangular.all('user').customGET('current').then(function(data) {
				$scope.user = data.data;
			});

			$scope.logout = function() {
				if (confirm('Do you want to logout?')) {
					localStorage.removeItem('semper-admin-token');
					window.location = './index.html'
				}
			}
		}
	};
});

myApp.directive('sendEmail', ['$location', function ($location) {
    return {
        restrict: 'E',
        scope: { post: '&' },
        link: function (scope, nga) {
        	console.log(scope)
            scope.send = function () {
                $location.path('/sendPost/' + scope.post().values.id);
            };
        },
        template: '<a class="btn btn-default btn-xs" ng-click="send()"> <span class="glyphicon glyphicon-envelope" aria-hidden="true"></span> Send Test</a>'
    };
}]);

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
