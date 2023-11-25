module.exports = function(myApp) {

    myApp.directive('dashboardLast10UsersUpdated', [ 'Restangular', function (Restangular) {
		return {
			restrict: 'E',
            replace: true,
			scope: {},
            controller: function($scope) {
                $scope.query = function() {
                    Restangular.all('user').getList({ limit: 5, sortField: 'updatedAt', sortDir: 'DESC' }).then(function(res) {
                        $scope.data = res.data;
                    });
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
