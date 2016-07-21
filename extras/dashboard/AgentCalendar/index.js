module.exports = function(myApp) {

    myApp.directive('dashboardAgentCalendar', [ 'Restangular', '$q', function (Restangular, $q) {
		return {
			restrict: 'E',
            replace: true,
			scope: {},
            controller: function($scope) {
                $scope.title = '';
                var now = moment().hours(0).minutes(0).second(0).millisecond(0);

                $q.all([
                    Restangular.all('agent').getList({ createdAt: [ now.clone().format(), null ].join(',') }),
                    Restangular.all('agent').getList({ createdAt: [ now.clone().add('days', -1).format(), now.clone().format() ].join(',') }),
                    Restangular.all('agent').getList({ createdAt: [ now.clone().add('days', -7).format(), null ].join(',') }),
                    Restangular.all('agent').getList({ createdAt: [ now.clone().add('days', -30).format(), null ].join(',') })
                ])
                .then(function(queries) {

                    $scope.results = {
                        today: queries[0].totalCount,
                        yesterday: queries[1].totalCount,
                        last7Days: queries[2].totalCount,
                        last30Days: queries[3].totalCount
                    };
                });
            },
			template: require('./section.html')
		};
	}]);
};
