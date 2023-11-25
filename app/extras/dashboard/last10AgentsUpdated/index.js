module.exports = function(myApp) {

    myApp.directive('dashboardLast10AgentsUpdated', [ 'Restangular', function (Restangular) {
		return {
			restrict: 'E',
            replace: true,
			scope: {},
            controller: function($scope) {
                $scope.query = function() {
                    Restangular.all('agent').getList({ limit: 5, sortField: 'updatedAt', sortDir: 'DESC' }).then(function(res) {
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
