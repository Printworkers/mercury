module.exports = function(myApp) {

    myApp.directive('dashboardUsersOnline', [ 'Restangular', function (Restangular) {
		return {
			restrict: 'E',
            replace: true,
			scope: {},
            controller: function($scope) {
                $scope.query = function() {
                    Restangular.all('agent').getList({ limit: 5, sortField: 'createdAt', sortDir: 'ASC' }).then(function(res) {
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
