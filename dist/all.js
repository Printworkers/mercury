module.exports = function(myApp) {
	myApp.controller('totalActiveAgents', ['$scope', '$window', '$http', function($scope, $window, $http, apiUrl) { // used in header.html
		$http.get(apiUrl + 'agent', {headers: {'x-access-token': localStorage.getItem('semper-admin-token') }}).then(function (response) {
			$scope.today = response.data.data.length;
		});
	}]);
};
module.exports = function(myApp) {
	// custom controllers
	myApp.controller('username', ['$scope', '$window', function($scope, $window) { // used in header.html

		$scope.username =	'test';
	}]);
};
var _ = require('lodash');

module.exports = function(myApp) {
    myApp.directive('dashboard', function() {
        return {
            templateUrl: 'dashboard.html',
            controller: function($scope, apiUrl, $http) {
            	var stats = ['agent', 'application', 'homeOffice', 'job', 'order', 'work', 'education', 'document', 'user', 'lookup', 'template', 'skill'];
            	_.map(stats, function(stat) {
	                $http.get(apiUrl + stat + "/count", {headers: {'x-access-token': localStorage.getItem('semper-admin-token') }}).then(function (response) {
						$scope[stat] = response.data.count;
					});
            	})
            	console.log($scope)
            }
        };
    });
};
module.exports = function(myApp) {
    myApp.directive('header', function() {
        return {
            templateUrl: 'header.html',
            controller: function($scope, Restangular) {
                Restangular.all('user').customGET('current').then(
                    function(data) {
                        $scope.user = data.data;
                    });
                $scope.logout = function() {
                    if (confirm('Do you want to logout?')) {
                        localStorage.removeItem('semper-admin-token');
                        window.location = './index.html';
                    }
                };
            }
        };
    });
};
module.exports = function(myApp) {
    myApp.directive('loginAsUser', function(Restangular, $q, notification, $state) {
        'use strict';

        return {
            restrict: 'E',
            scope: {
                selection: '=',
                type: '@'
            },
            link: function(scope, element, attrs) {
            	scope.login = function() {
            		window.alert('Feature Coming Soon');
            	};
            },
            template: '<button class="btn btn-success btn-xs" ng-click="login()"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span>&nbsp; Login as</button>'
        };
    });
};
module.exports = function(myApp) {
    myApp.directive('previewJob', function(Restangular, $q, notification,
        $state) {
        'use strict';
        return {
            restrict: 'E',
            scope: {
                selection: '=',
                type: '@'
            },
            link: function(scope, element, attrs) {
                scope.showJob = function() {
                    window.alert('Feature Coming Soon');
                };
            },
            template: '<button class="btn btn-success btn-xs" ng-click="showJob()"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span>&nbsp; Live Preview</button>'
        };
    });
};
module.exports = function(myApp) {
    myApp.directive('sendEmail', ['$location',
        function($location) {
            return {
                restrict: 'E',
                scope: {
                    post: '&'
                },
                link: function(scope, nga) {
                    console.log(scope);
                    scope.send = function() {
                        $location.path('/sendPost/' + scope.post().values.id);
                    };
                },
                template: '<a class="btn btn-default btn-xs" ng-click="send()"> <span class="glyphicon glyphicon-envelope" aria-hidden="true"></span> Send Test</a>'
            };
        }
    ]);
};
module.exports = function (nga, user) {
        /* Agent */
    var agent = nga.entity('agent').identifier(nga.field('_id'));

    agent.listView()
    .title('Staff & Job Agents')
    .fields([
        nga.field('name'),
        nga.field('city'),
        nga.field('state'),
        nga.field('fmId')
        	.label('FM Id'),
        nga.field('type'),
        nga.field('description'),
        nga.field('status')
        	.label('Status'),
    ]).listActions([
    	'edit',
    	'delete',
    	'<login-as-user item="{{entry}}"></login-as-user>'
    ])
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

module.exports = function (nga, user, order) {
/* Application */
    var application = nga.entity('application').identifier(nga.field('_id'));
    application.listView()
    .title('Job Applications')
    .fields([
        nga.field('title'),
        nga.field('User.username').label('Owner'),
        nga.field('fmJobId')
        	.label('FM Job Id'),
        nga.field('fmClientId')
        	.label('FM Client Id'),
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
module.exports = function (nga) {
	/* HomeOffice */
    var homeoffice = nga.entity('homeoffice').identifier(nga.field('_id'));

    homeoffice.label('Home Offices');
    
    homeoffice.listView()
    .title('Home Offices')
    .fields([
        nga.field('name'),
        nga.field('fmOfficeId'),
        nga.field('phone'),
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
module.exports = function (nga) {
	/* Job */
    var job = nga.entity('job').identifier(nga.field('_id'));
    job.label('Jobs');

    job.listView()
    .title('Jobs')
    .perPage(50)
    .fields([
        nga.field('name'),
        nga.field('city'),
        nga.field('state'),
        nga.field('status')
        	.label('Job Status'),
        nga.field('fmJobId')
        	.label('FM Id'),
        nga.field('User.company').label('Company')
    ]).listActions([
    	'edit', 
    	'show',
    	'delete',
    	'<preview-job item="{{entry}}"></preview-job>',
    	'<fm-sync-job job="{{entry}}"></fm-sync-job>'
    ])
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

    job.editionView()
        .title('Create new Job')
        .fields([
            nga.field('name').validation({required: true }).cssClasses('col-sm-8'),
            nga.field('city')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('state')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('description', 'wysiwyg').validation({required: true }),

            // New Fields.
            nga.field('calc_region')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('calc_size_descripts')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('calc_web_description')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('calc_work_type')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('date_web')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('dept_code')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('dept_code_name')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('dept_code_name_duplicate')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('duration')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('flag_full_time')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('fmClientId')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('id_employee_recruiter')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),    
            nga.field('fmJobId')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('fnOfficeId')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('rate_range')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('region')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('salary_range')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('shifts')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),    	
            nga.field('shifts_WorkType')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('skills')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('staff_recruiter')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('state')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('web_description')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('web_office')
            	.validation({required: true })
            	.cssClasses('col-sm-4'),
            nga.field('web_other_city')
            	.validation({required: true })
            	.cssClasses('col-sm-4')
           ]);

    job.showView().fields(job.editionView().fields());

    return job;
};
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
	    
module.exports = function (nga, user) {
	/* Order */
	var order = nga.entity('order').identifier(nga.field('_id'));

	order.listView()
	.title('Orders')
	.fields([
		nga.field('name'),
		nga.field('fmClientId')
			.label('FM Client Id'),
		nga.field('fmJobId')
			.label('FM Job Id'),
		nga.field('type'),
		nga.field('homeOffice')
			.label('Home Office'),
		nga.field('User.company'),
		nga.field('createdAt', 'date')
			.format('MM-dd-yyyy')
			.label('Date Submitted'),
		nga.field('status')
			.label('Status')
	]).listActions([
		'edit', 
		'delete',
	])
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

module.exports = function (nga, user) {
	/* Order */
	var skill = nga.entity('skill').identifier(nga.field('_id'));

	skill.listView()
	.title('Job Skills')
	.fields([
		nga.field('department'),
		nga.field('primary')
			.label('Primary Skill'),
		nga.field('secondary')
			.label('Secondary Skill'),
	]).listActions([])
	.filters([
		nga.field('q', 'template')
			.label('')
			.pinned(true)
			.template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>')
	]);

	skill.creationView()
		.title('Create new Skill')
		.description('This provides a way to create a new job skill.')
		.fields([
			nga.field('department')
				.validation({ required: true })
				.attributes({ placeholder: 'Enter Department' })
				.cssClasses('col-sm-4'),
			nga.field('primary')
				.validation({ required: true })
				.attributes({ placeholder: 'Enter Primary Skill' })
				.cssClasses('col-sm-4'),
			nga.field('secondary')
				.validation({ required: true })
				.attributes({ placeholder: 'Enter Secondary Skill' })
				.cssClasses('col-sm-4'),
		]);

	skill.editionView()
		.description('This provides a way to edit a job skill.')
		.fields(skill.creationView().fields());

	return skill;
};
// var myTemplate = require('../templates/sendEmail.html');

module.exports = function (nga, user) {

	/* emailTemplate */
	var template = nga.entity('template').identifier(nga.field('_id'));
	template.label('Templates');

	template.listView()
	.title('Templates')
	.fields([
		nga.field('name').label('Template Name'),
		nga.field('type').label('Type'),
		nga.field('createdAt', 'date')
			.format('MM/dd/yy')
			.label('Created'),
		nga.field('updatedAt', 'date')
			.format('MM/dd/yy')
			.label('Updated'),
		nga.field('custom_action')
			.label('')
			.template('<send-email post="entry"></send-email>')
	]).listActions(['edit', 'delete'])
	.filters([
		nga.field('q', 'template')
			.label('')
			.pinned(true)
			.template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>'),
		nga.field('name').label('Type'),
	]);

	template.creationView()
		.title('Create new Email Template')
		.description('Use this to create a new email template.')
		.fields([
			nga.field('name')
				.attributes({ placeholder: 'Enter a name for this template' })
				.validation({ required: true })
				.cssClasses('col-sm-8'),
			nga.field('html', 'wysiwyg')
				.attributes({ placeholder: 'Enter an HTML template' })
				.validation({required: true }),
			nga.field('type')
				.validation({ required: true })
				.attributes({ placeholder: 'Enter a type' })
				.cssClasses('col-sm-4')
		]);

	template
		.editionView()
		.description('Use this to edit an existing email template.')
		.fields(template.creationView().fields());

	return template;
};
module.exports = function (nga, lookups) {
	var user = nga.entity('user').identifier(nga.field('_id'));

	user.listView()
	.title('Users')
	.fields([
		nga.field('firstname')
			.label('Name'),
		nga.field('username'),
		nga.field('email'),
		nga.field('fmId')
			.label('FMId'),
		nga.field('type'),
		nga.field('phone'),
		nga.field('lastLoginAt', 'date')
			.format('MM/dd/yyyy')
			//.label('Last Login')
	]).listActions([
		'edit',
		'<user-manage user="entry"></user-manage>',
		'<login-as-user item="entry"></login-as-user>',
		'<fm-sync-job job="{{entry}}"></fm-sync-job>'
	])
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
		.title('Create new User Account')
		.description('Use this to create a new account. While you can create a job seeker or employer, their required fields can cause validation issues.')
		.fields([
			nga.field('type', 'choice')
				.defaultValue('job seeker')
				.attributes({ placeholder: 'Select the user account type.' })
				.choices([ { value: 'employer', label: 'Employer' }, { value: 'job seeker', label: 'Job Seeker' }, { value: 'administrator', label: 'Site Administrator' } ])
				.validation({required: true })
				.cssClasses('col-sm-4'),
			nga.field('firstname')
				.validation({required: true })
				.attributes({ placeholder: 'Enter first name' })
				.cssClasses('col-sm-4'),
			nga.field('lastname')
				.validation({required: true })
				.attributes({ placeholder: 'Select last name' })
				.cssClasses('col-sm-4'),
			nga.field('phone')
				.validation({required: true })
				.attributes({ placeholder: 'Enter Phone Number' })
				.cssClasses('col-sm-4'),
			nga.field('company')
				.validation({required: true })
				.attributes({ placeholder: 'Enter Company Name' })
				.cssClasses('col-sm-4'),
			nga.field('username')
				.validation({required: true })
				.attributes({ placeholder: 'Select username', autocomplete: "false" })
				.cssClasses('col-sm-4'),
			nga.field('password', 'password')
				.validation({required: true })
				.attributes({ placeholder: 'Select a password' })
				.cssClasses('col-sm-4'),
			nga.field('address_line1')
				.validation({required: true })
				.attributes({ placeholder: 'Select Street Address' })
				.cssClasses('col-sm-4'),
			nga.field('email')
				.validation({required: true })
				.attributes({ placeholder: 'Select Email Address' })
				.cssClasses('col-sm-4'),
			nga.field('city')
				.validation({required: false })
				.attributes({ placeholder: 'Enter Address City' })
				.cssClasses('col-sm-4'),
			nga.field('state', 'choice')
				.validation({required: false })
				.attributes({ placeholder: 'Select a State' })
				.choices(lookups.states)
				.cssClasses('col-sm-4'),
			nga.field('zip')
				.validation({required: false })
				.attributes({ placeholder: 'Select a zip code' })
				.cssClasses('col-sm-4'),
			nga.field('shortProfile', 'wysiwyg')
				.validation({required: false })
				.attributes({ placeholder: 'Select the user account type.' })
		]);

	user.editionView().fields(user.creationView().fields());
	
	return user;
};

module.exports = function (myApp) {

	myApp.config(function($stateProvider) {
		$stateProvider.state('filemaker', {
			parent: 'main',
			url: '/filemaker',
			controller: function(user, $scope) {
				// TODO: Do we need any data.
			},
			controllerAs: 'controller',
			templateUrl: '/templates/filemaker.html'
		});
	});

	myApp.config(function($stateProvider) {
		$stateProvider.state('findAndLinkToFM', {
			parent: 'main',
			url: '/findAndLink',
			controller: function(user, $scope) {
				// TODO: Do we need any data.
			},
			controllerAs: 'controller',
			templateUrl: '/templates/findAndLink.html'
		});
	});

	myApp.config(function($stateProvider) {
		$stateProvider.state('filemaker', {
			parent: 'main',
			url: '/compareWebToFm',
			controller: function(user, $scope) {
				// TODO: Do we need any data.
			},
			controllerAs: 'controller',
			templateUrl: '/templates/compareWebToFm.html'
		});
	});

}
module.exports = function (myApp) {

	myApp.directive('fmSyncJob', [ '$location', function ($location) {
		return {
			restrict: 'E',
			scope: { 
				user: '&' 
			},
			link: function (scope) {
				// var id = scope.user().values._id;

				// scope.open = function () {
				// 	$location.path('/job/details/' + id);
				// };
			},
			template: '<button class="btn btn-primary btn-xs" ng-click="open()"><i class="fa fa-download"></i>&nbsp;FM Sync</button>'
		};
	}]);

}
module.exports = function (myApp) {

	myApp.config(function($stateProvider) {
		$stateProvider.state('user-detail', {
			parent: 'main',
			url: '/user/details/:id',
			params: { id: null },
			resolve: {
				user: function($stateParams, $q, Restangular) {
					var deferred = $q.defer();
					Restangular.all('user').get($stateParams.id).then(function(data) {
						if (data.data) {
							deferred.resolve(data.data);
						} else {
							deferred.resolve(data);
						}
					}, function(err) {
						deferred.reject(err);
					});
					return deferred.promise;
				}
			},
			controller: function(user, $scope) {
				$scope.tab = 'details';
				$scope.user = user;
			},
			controllerAs: 'controller',
			templateUrl: '/templates/user-tabs.html'
		});

		$stateProvider.state('user-detail-tabs', {
			parent: 'main',
			url: '/user/details/:id/:tab',
			params: { id: null, tab: null },
			resolve: {
				user: function($stateParams, $q, Restangular) {
					var deferred = $q.defer();
					Restangular.all('user').get($stateParams.id).then(function(data) {
						if (data.data) {
							deferred.resolve(data.data);
						} else {
							deferred.resolve(data);
						}
					}, function(err) {
						deferred.reject(err);
					});
					return deferred.promise;
				}
			},
			controller: function(user, $scope, $stateParams) {
				$scope.tab = $stateParams.tab;
				$scope.user = user;
			},
			controllerAs: 'controller',
			templateUrl: '/templates/user-tabs.html'
		});
	});

	myApp.directive('fmSyncUser', [ '$location', function ($location) {
		return {
			restrict: 'E',
			scope: { 
				user: '&' 
			},
			link: function (scope) {
				// var id = scope.user().values._id;

				// scope.open = function () {
				// 	$location.path('/job/details/' + id);
				// };
			},
			template: '<button class="btn btn-primary btn-xs" ng-click="open()"><i class="fa fa-download"></i>&nbsp;Sync</button>'
		};
	}]);

	myApp.directive('userManage', [ '$location', function ($location) {
		return {
			restrict: 'E',
			scope: { 
				user: '&' 
			},
			link: function (scope) {
				var id = scope.user().values._id;

				scope.open = function () {
					$location.path('/user/details/' + id);
				};
			},
			template: '<button class="btn btn-success btn-xs" ng-click="open()">Manage</button>'
		};
	}]);

	myApp.directive('userDetails', function(Restangular) {
		'use strict';
		return {
			restrict: 'E',
			scope: {
				user: '='
			},
			controller: function($scope) {
				$scope.user = $scope.user;
			},
			templateUrl: 'templates/user-details.html'
		};
	});

	myApp.directive('userFilemakerDetails', function(Restangular) {
		'use strict';
		return {
			restrict: 'E',
			scope: {
				user: '='
			},
			controller: function($scope, Restangular) {
				// TODO: Add in the API Call to File Mker for this ID.
			},
			templateUrl: 'templates/user-filemaker-details.html'
		};
	});

	myApp.directive('userAgentsTable', function(Restangular) {
		'use strict';
		return {
			restrict: 'E',
			scope: {
				user: '='
			},
			controller: function($scope, Restangular) {
				Restangular.all('agent').getList({ User: $scope.user._id }).then(function(data) {
					if (data.data) {
						$scope.events = data.data;
					} else {
						$scope.events = data;
					}
				});
			},
			templateUrl: 'templates/user-agents-table.html'
		};
	});
}
exports.states = require('./states.json');