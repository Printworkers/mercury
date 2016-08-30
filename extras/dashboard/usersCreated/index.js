module.exports = function(myApp) {

    myApp.directive('dashboardUserCreatedAt', [ 'Restangular', function (Restangular) {
		return {
			restrict: 'E',
            replace: true,
			scope: {},
            controller: function($scope) {
                $scope.title = '';

                Restangular.all('user').customGet(null, 'report/createdat').then(function(res) {
                    $scope.data = res.data;
                    console.log('data', $scope.data);
                });

                $scope.query = function() {
                };

                $scope.refresh = function() {
                    $scope.query();
                };

                $scope.query();
            },
			template: require('./section.html')
		};
	}]);
};
