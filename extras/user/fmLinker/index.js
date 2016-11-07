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

				$scope.searchParams = {
					firstname: '',
					lastname: '',
					email: $scope.user.email,
					phone: '',
					address_city: '',
					adress_state: ''
				};

				$scope.setDefaults = function() {
					$scope.searchParams = {
						firstname: $scope.user.name_first,
						lastname: $scope.user.name_last,
						email: $scope.user.email,
						phone: $scope.user.phone,
						city: $scope.user.address_city,
						state: $scope.user.address_state
					};
				};


				if ($scope.user.name_first) {
					$scope.searchTerm = $scope.user.email;
				}

				$scope.$watch('searchParams', function(newValue, oldValue) {
					if (newValue !== oldValue) {
						$scope.search();
						buildUrl();
					}
				});

				var buildUrl = function() {
					var urlBase = FMApiUrl + '/user_find_multi.php';
					var parts = [];
					var obj = $scope.searchParams;
				    for (var i in obj) {
				        if (obj.hasOwnProperty(i) && obj[i] !== '') {
				            parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
				        }
				    }
				    var query = parts.join("&");

					$scope.url = urlBase + '?' + query + '&limit=50';
					return $scope.url;
				};

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
