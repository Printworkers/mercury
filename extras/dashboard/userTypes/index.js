module.exports = function(myApp) {

    myApp.directive('dashboardUserTypes', [ 'Restangular', function (Restangular) {
		return {
			restrict: 'E',
            replace: true,
			scope: {},
            controller: function($scope) {
                $scope.title = '';
                Restangular.all('user').customGETLIST('count', { group: 'type' }).then(function(res) {
                    $scope.data = res.data;
                });
            },
			template: require('./section.html')
		};
	}]);
};
