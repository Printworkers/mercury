(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var myApp = angular.module('myApp', ['ng-admin']);

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
    $scope.username =  $window.localStorage.getItem('posters_galore_login');
}]);

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

function loginController($http, notification) {
    // notification is the service used to display notifications on the top of the screen
    this.notification = notification;
};
loginController.inject = ['$http', 'notification'];
loginController.prototype.login = function() {
	// $http.post('http://semperllc.herokuapp.com/user/authenticate', {

	// })
    this.notification.log('Email successfully sent to ' + this.email);
};



myApp.config(['NgAdminConfigurationProvider', 'RestangularProvider', function(NgAdminConfigurationProvider, RestangularProvider) {
    var nga = NgAdminConfigurationProvider;

    RestangularProvider.setDefaultHeaders({'x-access-token': 'test' });
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

    RestangularProvider.setResponseInterceptor(function(response, operation, route, url) {
	  var data;
	  if (operation === 'getList') {
	    data = response.data.docs ? response.data.docs : response;
	  } else {
	    data = response;
	  }
	  return data;
	});

    // var apiUrl = (window.location.origin.indexOf('localhost') == -1) ? 'http://semperllc.herokuapp.com/' : 'http://localhost:7001/';

    var apiUrl = 'http://semperllc.herokuapp.com/'

    /* create an admin application. */
    var admin = nga.application('Semper LLC Administrator').baseApiUrl(apiUrl); 
    var user = require('./entities/user')(nga)
    var agent = require('./entities/agent')(nga, user)
    var lookup = require('./entities/lookup')(nga)
    var job = require('./entities/job')(nga)
    var homeoffice = require('./entities/homeoffice')(nga)
    var order = require('./entities/order')(nga, user)
    var application = require('./entities/application')(nga, user, order)
    var resume = require('./entities/resume')(nga, user)

    admin.addEntity(user);
    admin.addEntity(lookup);
    admin.addEntity(job);
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
},{"./entities/agent":2,"./entities/application":3,"./entities/homeoffice":4,"./entities/job":5,"./entities/lookup":6,"./entities/order":7,"./entities/resume":8,"./entities/user":9}],2:[function(require,module,exports){
module.exports = function (nga, user) {
        /* Agent */
    var agent = nga.entity('agent').identifier(nga.field('_id'));

    agent.listView()
    .title('Staff & Job Agents')
    .fields([
        nga.field('name'),
        nga.field('city'),
        nga.field('state'),
        nga.field('type'),
        nga.field('description')
    ]).listActions(['edit', 'delete'])
    .filters([
        nga.field('q', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>'),
        nga.field('type').label('Type'),
        nga.field('username', 'string').label('Username'),  
        nga.field('email', 'string').label('email'),
        nga.field('city', 'string').label('City'),
        nga.field('state', 'string').label('State')
    ]);

    agent.creationView()
        .title('Create new Agent')
        .fields([
            nga.field('name')
                .validation({ required: true })
                .cssClasses('col-sm-8'),
            nga.field('type', 'choice')
                .choices([ { value: 'job', label: 'Job' }, { value: 'staff', label: 'Staff' } ])
                .validation( {required: true } )
                .cssClasses('col-sm-4'),
            nga.field('User', 'reference')
                .targetEntity(user) 
                .targetField(nga.field('firstname')),
            // No Required Fields.
            nga.field('city').validation({ required: false }).cssClasses('col-sm-4'),
            nga.field('country').validation({ required: false }).cssClasses('col-sm-4'),
            nga.field('ExpirationDate').validation({ required: false }).cssClasses('col-sm-4'),
            nga.field('salary').validation({ required: false }).cssClasses('col-sm-4'),
            nga.field('skill').validation({ required: false }).cssClasses('col-sm-4'),
            nga.field('worktype').validation({ required: false }).cssClasses('col-sm-4'),
            nga.field('state').validation({ required: false }).cssClasses('col-sm-4'),
            nga.field('shift').validation({ required: false }).cssClasses('col-sm-4')
        ]);

    agent.editionView().fields(agent.creationView().fields());

    return agent;
};

},{}],3:[function(require,module,exports){
module.exports = function (nga, user, order) {
/* Application */
    var application = nga.entity('application').identifier(nga.field('_id'));
    application.listView()
    .title('Job Applications')
    .fields([
        nga.field('title'),
        nga.field('User.username').label('Owner'),
        nga.field('Order.name').label('Job Order'),
        nga.field('status').label('Status')
    ]).listActions(['edit', 'delete'])
    .filters([
    	nga.field('q', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>'),
        nga.field('type').label('Type'),
        nga.field('username', 'string').label('Username'),	
        nga.field('email', 'string').label('email'),
        nga.field('city', 'string').label('City'),
        nga.field('state', 'string').label('State')
    ]);

   	application.creationView()
        .title('Create new Job Application')
        .fields([
            nga.field('title').validation({required: true }).cssClasses('col-sm-4'),
            nga.field('User', 'reference')
    			.targetEntity(user) 
    			.targetField(nga.field('firstname')),
    		nga.field('Order', 'reference')
    			.targetEntity(order) 
    			.targetField(nga.field('name')),
    		 nga.field('description').validation({ required: false }).cssClasses('col-sm-8'),
        ]);

    application.editionView().fields(application.creationView().fields());

    return application;
};
},{}],4:[function(require,module,exports){
module.exports = function (nga) {
	/* HomeOffice */
    var homeoffice = nga.entity('homeoffice').identifier(nga.field('_id'));

    homeoffice.label('Home Offices');
    
    homeoffice.listView()
    .title('Home Offices')
    .fields([
        nga.field('name'),
        nga.field('city'),
        nga.field('state')
    ]).listActions(['edit', 'delete'])
    .filters([
    	nga.field('q', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>'),
        nga.field('type').label('Type'),
        nga.field('username', 'string').label('Username'),	
        nga.field('email', 'string').label('email'),
        nga.field('city', 'string').label('City'),
        nga.field('state', 'string').label('State')
    ]);

   	homeoffice.creationView()
        .title('Create new Home Office')
        .fields([
            nga.field('name').validation({required: true }).cssClasses('col-sm-8'),
            nga.field('city').validation({required: true }).cssClasses('col-sm-4'),
            nga.field('state').validation({required: true }).cssClasses('col-sm-4'),
            nga.field('zip').validation({required: true }).cssClasses('col-sm-4'),
            nga.field('emailAddress1').validation({required: false }).cssClasses('col-sm-4'),
            nga.field('emailAddress2').validation({required: false }).cssClasses('col-sm-4'),
            nga.field('phone').validation({required: false }).cssClasses('col-sm-4'),
        ]);

    homeoffice.editionView().fields(homeoffice.creationView().fields());
    
    return homeoffice;
};
},{}],5:[function(require,module,exports){
module.exports = function (nga) {
	/* Job */
    var job = nga.entity('job').identifier(nga.field('_id'));
    job.label('Jobs');

    job.listView()
    .title('Jobs')
    .fields([
        nga.field('name'),
        nga.field('city'),
        nga.field('state'),
        nga.field('User.company').label('Company')
    ]).listActions(['edit', 'delete'])
    .filters([
    	nga.field('q', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>'),
        nga.field('type').label('Type'),
        nga.field('username', 'string').label('Username'),	
        nga.field('email', 'string').label('email'),
        nga.field('city', 'string').label('City'),
        nga.field('state', 'string').label('State')
    ]);

    job.creationView()
        .title('Create new Job')
        .fields([
            nga.field('name').validation({required: true }).cssClasses('col-sm-8'),
            nga.field('city').validation({required: true }).cssClasses('col-sm-4'),
            nga.field('state').validation({required: true }).cssClasses('col-sm-4'),
            nga.field('description', 'wysiwyg').validation({required: true })
        ]);

    job.editionView().fields(job.creationView().fields());

    return job;
};
},{}],6:[function(require,module,exports){
module.exports = function (nga) {
	var lookup = nga.entity('lookup').identifier(nga.field('_id'));

    lookup.listView()
    .title('Lookup Options')
    .fields([
        nga.field('value'),
        nga.field('label'),
        nga.field('type'),
    ]).listActions(['edit', 'delete'])
    .filters([
    	nga.field('q', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>'),
        nga.field('type', 'choice')
        	.label('Type')
        	.choices([ 
    			{ value: 'industry', label: 'Industry' }, 
    			{ value: 'region', label: 'Region' },
    			{ value: 'source', label: 'Source' },
    			{ value: 'salary', label: 'Salary' },
    			{ value: 'shift', label: 'Shift' },
    			{ value: 'type', label: 'Type' } 
    		])
    ]);

    lookup.creationView()
        .title('Create new User')
        .fields([
        	nga.field('type', 'choice')
        		.choices([ 
        			{ value: 'industry', label: 'Industry' }, 
        			{ value: 'region', label: 'Region' },
        			{ value: 'source', label: 'Source' },
        			{ value: 'salary', label: 'Salary' },
        			{ value: 'shift', label: 'Shift' },
        			{ value: 'type', label: 'Type' } 
        		])
        		.validation({required: true })
        		.cssClasses('col-sm-4'),
            nga.field('value').validation({required: true }).cssClasses('col-sm-4'),
            nga.field('label').validation({required: true }).cssClasses('col-sm-4')
        ]);

    lookup.editionView().fields(lookup.creationView().fields());

    return lookup;
};
/* Lookups */
	    
},{}],7:[function(require,module,exports){
module.exports = function (nga, user) {
/* Order */
    var order = nga.entity('order').identifier(nga.field('_id'));
    order.listView()
    .title('Orders')
    .fields([
        nga.field('name'),
        nga.field('type'),
        nga.field('User.company')
    ]).listActions(['edit', 'delete'])
    .filters([
    	nga.field('q', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>')
    ]);

   	order.creationView()
        .title('Create new Order')
        .fields([
            nga.field('name').validation({required: true }).cssClasses('col-sm-4'),
            nga.field('type').validation({required: true }).cssClasses('col-sm-4'),
            nga.field('User', 'reference')
    			.targetEntity(user) 
    			.targetField(nga.field('firstname'))
        ]);

    order.editionView().fields(order.creationView().fields());

    return order;
};
},{}],8:[function(require,module,exports){
module.exports = function (nga, user) {
/* -------------------------------------------------------- */
    /* Resumes */

    var resume = nga.entity('resume').identifier(nga.field('_id'));
    resume.listView()
    .title('Resumes')
    .fields([
        nga.field('User.username').label('Owner'),
        nga.field('createdAt').label('Created'),
        nga.field('publish').label('Published')
    ]).listActions(['edit', 'delete']);

   	resume.creationView()
        .title('Create new Resume')
        .fields([
            nga.field('User', 'reference')
    			.targetEntity(user) 
    			.targetField(nga.field('firstname')),
    		nga.field('career_obj', 'wysiwyg').validation({ required: false }),
    		nga.field('special_skills', 'wysiwyg').validation({ required: false }),
    		nga.field('textResume', 'wysiwyg').validation({ required: false })
        ]);

    resume.editionView().fields(resume.creationView().fields());

    return resume;
};

},{}],9:[function(require,module,exports){
module.exports = function (nga) {
	var user = nga.entity('user').identifier(nga.field('_id'));

    user.listView()
    .title('Users')
    .fields([
        nga.field('firstname'),
        nga.field('username'),
        nga.field('email'),
        nga.field('type'),
        nga.field('phone')
    ]).listActions(['edit', 'delete'])
    .filters([
    	nga.field('q', 'template')
            .label('')
            .pinned(true)
            .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>'),
        nga.field('type').label('Type'),
        nga.field('username', 'string').label('Username'),	
        nga.field('email', 'string').label('email'),
        nga.field('city', 'string').label('City'),
        nga.field('state', 'string').label('State')
    ]);

    user.creationView()
        .title('Create new User')
        .fields([
        	nga.field('type', 'choice')
        		.choices([ { value: 'employer', label: 'Employer' }, { value: 'job seeker', label: 'Job Seeker' } ])
        		.validation({required: true })
        		.cssClasses('col-sm-4'),
            nga.field('firstname').validation({required: true }).cssClasses('col-sm-4'),
            nga.field('lastname').validation({required: true }).cssClasses('col-sm-4'),
            nga.field('username').validation({required: true }).cssClasses('col-sm-4'),
            nga.field('password').validation({required: true }).cssClasses('col-sm-4'),
            nga.field('address1').validation({required: true }).cssClasses('col-sm-4'),
            nga.field('email').validation({required: true }).cssClasses('col-sm-4'),
            nga.field('city').validation({required: false }).cssClasses('col-sm-4'),
            nga.field('state').validation({required: false }).cssClasses('col-sm-4'),
            nga.field('zip').validation({required: false }).cssClasses('col-sm-4'),
            nga.field('shortProfile', 'wysiwyg').validation({required: false })
        ]);

    user.editionView().fields(user.creationView().fields());
	
	return user;
};

},{}]},{},[1])


//# sourceMappingURL=bundle.js.map
