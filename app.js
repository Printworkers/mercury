<<<<<<< HEAD
var myApp = angular.module('myApp', ['ng-admin', 'angularBasicAuth', 'angular-keenio' ]);

// 'angularBasicAuth'
=======
var _ = require('lodash')
var myApp = angular.module('myApp', ['ng-admin']);

var apiUrl = (window.location.origin.indexOf('localhost') == -1) ? 'http://semperllc.herokuapp.com/' : 'http://localhost:7001/';

var updateHeader;
>>>>>>> d91fcef8df756aa95e678fed319cbac71b0b143f

myApp.directive('header', function() {
    return {
        templateUrl: 'header.html'
    };
});

myApp.directive('dashboard', function() {
    return {
        templateUrl: 'dashboard.html'
    };
});

// custom controllers
myApp.controller('username', ['$scope', '$window', function($scope, $window) { // used in header.html
    $scope.username =  'test';
}]);

myApp.controller('totalActiveAgents', ['$scope', '$window', '$http', function($scope, $window, $http) { // used in header.html
    $http.get(apiUrl + 'agent', {headers: {'x-access-token': 'test' }}).then(function (response) {
        console.log(response)
    	$scope.today = response.data.data.length
    })
}]);

// myApp.controller('dashboard', ['scope', '$http', function($scope, $html){
// 	$scope.appCount = 123
// }]);

var loginControllerTemplate =
        '<div class="row"><div class="col-lg-12">' +
            '<ma-view-actions><ma-back-button></ma-back-button></ma-view-actions>' +
            '<div class="page-header">' +
                '<h1>Login</h1>' +
                '<p class="lead"></p>' +
            '</div>' +
        '</div></div>' +
        '<div class="row">' +
            '<div class="col-lg-5"><input type="text" size="10" ng-model="controller.email" class="form-control" placeholder="name@example.com"/></div>' +
            '<div class="col-lg-5"><input type="password" size="10" ng-model="controller.password" class="form-control" /></div>' +
            '<div class="col-lg-5"><a class="btn btn-default" ng-click="controller.login()">Send</a></div>' +
        '</div>';

myApp.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('send-post', {
        url: '/login',
        controller: loginController,
        controllerAs: 'controller',
        template: loginControllerTemplate
    });
}]);

function loginController($http, notification, $location) {
    // notification is the service used to display notifications on the top of the screen
    this.notification = notification;
    this.$http = $http;
    this.$location = $location
};
loginController.inject = ['$http', 'notification', '$location'];
loginController.prototype.login = function() {
	// $http.post('http://semperllc.herokuapp.com/user/authenticate', {

	// })
	updateHeader()
    this.$location.path('/dashboard');
    this.notification.log('Successfully logged in as ' + this.email);
};

myApp.run(['Restangular', '$location', function(Restangular, $location){
        // ==== CODE TO DO 401 NOT LOGGED IN CHECKING
        //This code will intercept 401 unauthorized errors returned from web requests.
        //On default any 401 will make the app think it is not logged in.
        Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {
            if(response.status === 403){
                $location.path('/login');
                return false;
            }
        });
    }]);



myApp.config(['NgAdminConfigurationProvider', 'RestangularProvider', function(NgAdminConfigurationProvider, RestangularProvider) {
    var nga = NgAdminConfigurationProvider;

    updateHeader = function() {
      console.log('here')
      RestangularProvider.setDefaultHeaders({'x-access-token': 'test' }); 	
    }

    RestangularProvider.setRestangularFields({ id: 'id' });
	RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params, httpConfig) {

        if (operation == 'getList' && what == 'entityName') {
            if (params._filters) {
                for (var filter in params._filters) {
                    params[filter] = params._filters[filter];
                }
                delete params._filters;
            }
        }
        return { params: params };
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

    

    /* create an admin application. */
    var admin = nga.application('Semper LLC Administrator').baseApiUrl(apiUrl); 
    var user = require('./entities/user')(nga)
    var agent = require('./entities/agent')(nga, user)
    var lookup = require('./entities/lookup')(nga)
    var job = require('./entities/job')(nga)
    var template = require('./entities/template')(nga)
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
	    // .addCollection(nga.collection(job)
	    //     .name('recent_jobs')
	    //     .title('Recent Job Posts')
	    //     .perPage(5) // limit the panel to the 5 latest posts
	    //     .fields([
	    //         nga.field('name', 'string').label('Title'),
	    //     ])
	    //     .sortField('published_at')
	    //     .sortDir('DESC')
	    //     .order(1)
	    // )
	    // .addCollection(nga.collection(user)
	    //     .name('Recent Users')
	    //     .title('Recent Users')
	    //     .perPage(5) // limit the panel to the 5 latest posts
	    //     .fields([
	    //         nga.field('firstname', 'string').label('Title'),
	    //     ])
	    //     .sortField('published_at')
	    //     .sortDir('DESC')
	    //     .order(1)
	    // )
	);

	/* Header */
    admin.header('<div header></div>');

    nga.configure(admin);
}]);