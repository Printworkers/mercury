module.exports = function (myApp) {

	myApp.config(function($stateProvider) {
		$stateProvider.state('filemaker', {
			parent: 'main',
			url: '/filemaker',
			controller: function($scope) {
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
			controller: function($scope) {
				// TODO: Do we need any data.
			},
			controllerAs: 'controller',
			templateUrl: '/templates/findAndLink.html'
		});
	});

	myApp.config(function($stateProvider) {
		$stateProvider.state('compareWebToFm', {
			parent: 'main',
			url: '/compareWebToFm',
			controller: function($scope) {
				// TODO: Do we need any data.
			},
			controllerAs: 'controller',
			templateUrl: '/templates/compareWebToFm.html'
		});
	});

	myApp.directive('userFilemakerDetails', function($http) {
		'use strict';
		return {
			restrict: 'E',
			scope: {
				user: '='
			},
			controller: function($scope, Restangular) {
				$scope.errorMessage = '';
				$scope.userData = $scope.user;
				$scope.hasEmployeeId = false

				if ($scope.user.fmEmployeeId) {
					$scope.hasEmployeeId = true;

					var get = function() {
						var id = $scope.user.fmEmployeeId;
						var url = 'https://semperpages-jrr316.c9users.io/SingleEmployee.php?empID=' + id;

						$http({
							method: 'GET',
							url: url
						}).then(function successCallback(response) {
							$scope.fmData = response.data;
							$scope.message = '';
						}, function errorCallback(response) {
							console.log('ERROR 1', response);
							$scope.errorMessage = 'Unable to get data from Filemaker';
						});
					};

					get();
				} else {
					$scope.errorMessage = 'This web account does not have a File Maker ID';
				}

			},
			templateUrl: 'templates/user-filemaker-details.html'
		};
	});

	myApp.directive('userFilemakerLinker', function(Restangular, $http) {
		'use strict';
		return {
			restrict: 'E',
			scope: {
				user: '='
			},
			controller: function($scope) {
				$scope.errorMessage = '';
				$scope.message = '';
				$scope.searching = false;
				$scope.results = [];
				$scope.searchTerm = '';
				$scope.searchField = 'FirstName';

				if ($scope.user.name_first) {
					$scope.searchTerm = $scope.user.name_first;
				}

				$scope.$watch('searchTerm', function() {
					$scope.search();
					buildUrl();
				});

				$scope.$watch('searchField', function() {
					$scope.search();
					buildUrl();
				});

				var buildUrl = function() {
					var urlBase = 'https://semperpages-jrr316.c9users.io/MultipleEmployees_result.php';
					$scope.url = urlBase + '?' + $scope.searchField + '=' + $scope.searchTerm + '&limit=50';

					return $scope.url;
				};

				$scope.seachFieldOpts = [
					{ value: 'Email', label: 'Email' },
					{ value: 'FirstName', label: 'First Name' },
					{ value: 'LastName', label: 'Last Name' },
					{ value: 'Phone', label: 'Phone Number' }
				];

				$scope.search = function() {
					$scope.searching = true;
					$scope.users = [];

					$http({
						method: 'GET',
						url: buildUrl()
					}).then(function successCallback(response) {
						console.log('sss', response.data);

						if (response.data.devices) {
							$scope.users = response.data.devices[0];
						} else {
							$scope.users = [];
						}

						$scope.searching = false;
					}, function errorCallback(response) {
						$scope.errorMessage = 'Unable to reach filemaker API.';
						$scope.searching = false;
					});
				};

				$scope.createUser = function() {
					alert('Coming Soon.');
				};

				$scope.useFMId = function(fmId) {
					if (confirm('Do you want to link this web user to this FileMaker Employee?')) {
						$scope.user.customPUT({ fmEmployeeId: fmId.toString() }).then(function(data) {
							console.log('Saved', data);
							$scope.user = data;
							$scope.message = 'You have successfully linked this account!';
						}, function(err) {
							console.log('No Data');
						});
					}
				};
			},
			templateUrl: 'templates/user-filemaker-linker.html'
		};
	});

};
