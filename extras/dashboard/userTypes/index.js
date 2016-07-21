module.exports = function(myApp) {

    myApp.directive('dashboardUserTypes', [ 'Restangular', function (Restangular) {
		return {
			restrict: 'E',
            replace: true,
			scope: {},
            controller: function($scope) {
                $scope.query = function() {
                    Restangular.all('user').customGETLIST('count', { group: 'type' }).then(function(res) {
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
