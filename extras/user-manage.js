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
			template: '<button class="btn btn-success btn-xs" ng-click="open()"><i class="glyphicon glyphicon-pensil"></i> Manage</button>'
		};
	}]);

	myApp.directive('userResume', function() {
		'use strict';
		return {
			restrict: 'E',
			scope: {
				user: '='
			},
			controller: function($scope) {},
			templateUrl: 'templates/user-resume.html'
		};
	});

};
