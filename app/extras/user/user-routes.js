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
			template: require('./tabs.html')
		});

		$stateProvider.state('user-detail-tabs', {
			parent: 'main',
			url: '/user/details/:id/:tab',
			params: { id: null, tab: null },
			resolve: userResolve,
			controller: userTabCtrl,
			controllerAs: 'controller',
			template: require('./tabs.html')
		});

	});

};
