module.exports = function (myApp) {

	myApp.directive('userFilemakerLinker', function(Restangular, $http, FMApiUrl) {
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
				$scope.searchField = 'email';

				if ($scope.user.name_first) {
					$scope.searchTerm = $scope.user.email;
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
					var urlBase = FMApiUrl + '/user_find_multi.php';
					$scope.url = urlBase + '?' + $scope.searchField + '=' + $scope.searchTerm + '&limit=50';

					return $scope.url;
				};

				$scope.seachFieldOpts = [
					{ value: 'email', label: 'Email' },
					{ value: 'name_first', label: 'First Name' },
					{ value: 'name_last', label: 'Last Name' },
					{ value: 'phone', label: 'Phone Number' }
				];

				$scope.search = _.debounce(function() {
					$scope.searching = true;
					$scope.users = [];

					$http({
						method: 'GET',
						url: buildUrl()
					}).then(function successCallback(response) {

						if (response.data) {
							$scope.users = response.data.data;
						} else {
							$scope.users = [];
						}

						$scope.searching = false;
					}, function errorCallback(response) {
						$scope.errorMessage = 'Unable to reach filemaker API.';
						$scope.searching = false;
					});
				}, 500);

				$scope.createUser = function() {
					var url = FMApiUrl + '/user_create.php';
					var data = { name_last: 'Test', name_first: 'Bobo', email: 'test1@test.com' };

					$http.post(url, data).then(function successCallback(response) {
						console.log('Got a user', response);
					}, function errorCallback(response) {
						console.log('erro', response);
					});

				};

				$scope.useFMId = function(id) {
					if (confirm('Do you want to link this web user to this FileMaker Employee?')) {
                        console.log('patch', { id_employee: id.toString() });

                        $scope.user.patch({ id_employee: id.toString() }).then(function(data) {
							$scope.user = data;
							$scope.message = 'You have successfully linked this account!';
						}, function(err) {
							console.log('No Data');
						});
					}
				};
			},
			template: require('./form.html')
		};
	});

};
