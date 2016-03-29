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

				// var id = scope.user().values._id;

				// scope.open = function () {
				// 	$location.path('/job/details/' + id);
				// };
			},
			template: '<button class="btn btn-primary btn-xs" ng-click="open()"><i class="fa fa-download"></i>&nbsp;Sync</button>'
		};
	}]);

	myApp.directive('userManage', [ '$location', function ($location, Restangular) {
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
			controller: function($scope) {
				$scope.user = $scope.user;

				$scope.lookups = {
					userTypes: [
						{ value: 'job seeker', label: 'Job Seeker' },
						{ value: 'employee', label: 'Employer' },
						{ value: 'administrator', label: 'Administator' },
						{ value: 'super', label: 'Administator Super' },
					]
				};

				Restangular.all('homeoffice').getList().then(function(data) {
					$scope.lookups.homeOffices = data;
				});

				$scope.save = function() {
					$scope.user.save().then(function(data) {
						console.log('ssss', data);

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