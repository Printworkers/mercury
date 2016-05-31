module.exports = function (myApp) {

	var userTabCtrl = function(user, $scope, $stateParams) {
		$scope.tab = $stateParams.tab || 'details';
		$scope.user = user;
		$scope.optionsSuccessMessage = '';
		$scope.optionsErrorMessage = '';

		$scope.sendSMSPassCode = function() {
			if (confirm('Do you want to send an SMS to this phone?')) {

				$scope.optionsSuccessMessage = '';
				$scope.optionsErrorMessage = '';

				$scope.user.customPOST({ via: 'sms' }, 'sendPassCode').then(function(data) {
					$scope.optionsSuccessMessage = data.message;
				}, function(err) {
					console.log('SMS', err);
					$scope.optionsErrorMessage = 'Got an Error';
				});
			}
		};

		$scope.sendEmailPassCode = function() {

			if (confirm('Do you want to send an Email to this user?')) {

				$scope.optionsSuccessMessage = '';
				$scope.optionsErrorMessage = '';

				$scope.user.customPOST({ via: 'email' }, 'sendPassCode').then(function(data) {
					$scope.optionsSuccessMessage = data.message;
				}, function(err) {
					console.log('SMS', err);
					$scope.optionsErrorMessage = 'Got an Error';
				});
			}
		};
	};

	var userResolve = {
		user: function($stateParams, $DataServices) {
			return $DataServices.User.get($stateParams.id);
		}
	};

	myApp.config(function($stateProvider) {
		$stateProvider.state('user-detail', {
			parent: 'main',
			url: '/user/details/:id',
			params: { id: null },
			resolve: userResolve,
			controller: userTabCtrl,
			controllerAs: 'controller',
			templateUrl: '/templates/user-tabs.html'
		});

		$stateProvider.state('user-detail-tabs', {
			parent: 'main',
			url: '/user/details/:id/:tab',
			params: { id: null, tab: null },
			resolve: userResolve,
			controller: userTabCtrl,
			controllerAs: 'controller',
			templateUrl: '/templates/user-tabs.html'
		});

		$stateProvider.state('user-fm-sync', {
			parent: 'main',
			url: '/user/fmSyncReport',
			params: { id: null, tab: null },
			controllerAs: 'controller',
			templateUrl: '/templates/user-fm-sync-report.html'
		});

	});

	myApp.directive('fmSyncUser', [ '$location', function ($location) {
		return {
			restrict: 'E',
			scope: {
				user: '&'
			},
			link: function (scope) {
			},
			template: '<button class="btn btn-primary btn-xs" ng-click="open()"><i class="fa fa-download"></i>&nbsp;Sync</button>'
		};
	}]);

	myApp.directive('userManage', [ '$location', '$state', function ($location, $state) {
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

	myApp.directive('userDetails', function(Restangular, notification) {
		'use strict';
		return {
			restrict: 'E',
			scope: {
				user: '='
			},
			controller: function($scope, usState, source, yesno, homeOffice) {
				$scope.user = $scope.user;

				$scope.lookUps = {
					state: usState,
					source: source,
					yesno: yesno
				};

				$scope.lookups = {
					userTypes: [
						{ value: 'job seeker', label: 'Job Seeker' },
						{ value: 'employer', label: 'Employer' },
						{ value: 'administrator', label: 'Administator' },
						{ value: 'super', label: 'Administator Super' },
					],
					homeOffices: homeOffice
				};

				$scope.save = function() {
					$scope.user.save().then(function(data) {
						/* Send the notification. */
						notification.log('Updated User Details', { addnCls: 'humane-flatty-success' });
					}, function(err) {
						/* Echo to the console. */
						console.error('Error', err);

						notification.log('Unable to save user details.', { addnCls: 'humane-flatty-error' });
					});
				};

			},
			templateUrl: 'templates/user-details.html'
		};
	});

	myApp.directive('userResume', function(Restangular) {
		'use strict';
		return {
			restrict: 'E',
			scope: {
				user: '='
			},
			controller: function($scope, Restangular) {
				// Restangular.all('agent').getList({ User: $scope.user._id }).then(function(data) {
				// 	if (data.data) {
				// 		$scope.events = data.data;
				// 	} else {
				// 		$scope.events = data;
				// 	}
				// });
			},
			templateUrl: 'templates/user-resume.html'
		};
	});

	myApp.directive('userForms', function(Restangular, $rootScope, $SchemaModal) {
		'use strict';
		return {
			restrict: 'E',
			scope: {
				user: '='
			},
			controller: function($scope) {

				$scope.addTestForm = function() {

					var schema = {
                        type: 'object',
                        properties: {
                          form_key: {
                              type: 'string',
							  title: 'Form Key'
                          },
                          adobe_url: {
                            type: 'string',
							title: 'Adobe Url'
						  },
						  s3Url: {
							  type: 'string',
							  title: 'S3 Url'
						  }
                        },
                        required: [ 'form_key', 'adobe_url', 's3Url' ]
                      };

                      var form = [
                        '*',
                        {
                          type: 'submit',
                          title: 'Submit'
                        }
                      ];

					  var submit = function(form, data, close) {
						  $scope.user.addForm(data).then(function(result) {
							  // Close the modal.
							  close();
						  });
					  };

					  $SchemaModal.open('Add Adobe Form', {}, schema, form, submit);
				};

				$scope.delete = function() {
					alert('Coming soon');
				};

				$scope.download = function() {
					alert('Coming soon');
				};

				$scope.data = $scope.user.forms;
			},
			templateUrl: 'templates/user-forms.html'
		};
	});
};
