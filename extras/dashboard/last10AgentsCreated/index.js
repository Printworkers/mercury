module.exports = function(myApp) {

    myApp.directive('dashboardLast10AgentsCreated', [ 'Restangular', function (Restangular) {
		return {
			restrict: 'E',
            replace: true,
			scope: {},
            controller: function($scope) {
                $scope.title = '';
                Restangular.all('agent').getList({ limit: 5, sortField: 'createdAt', sortDir: 'ASC' }).then(function(res) {
                    $scope.data = res.data;
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
