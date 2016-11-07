module.exports = function (myApp) {

	myApp.directive('queueRun', [ '$location', '$state', '$DataServices', function ($location, $state, $DataServices) {
		return {
			restrict: 'E',
			scope: {
				queue: '&'
			},
			link: function (scope) {
				var id = scope.queue().values._id;
				scope.status = scope.queue().values.status;

				scope.showClass = scope.status === 'complete' ? 'hide' : '';

				scope.execute = function() {
					if (confirm('Do you really want to run this job now?')) {
						// $http.post(url).then( function(data) {
						// 	console.log('Got Data', data);
						// });
						$DataServices.Queue.run(id).then(function(data) {
							console.log('Got Data', data);
						});
					}
				};
			},
			template: '<button class="btn btn-default btn-xs {{ showClass }}" ng-click="execute()"><i class="glyphicon glyphicon-cog"></i> Run</button>'
		};
	}]);

};
