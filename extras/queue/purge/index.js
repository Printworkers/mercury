module.exports = function (myApp) {

	myApp.directive('queuePurgeCompletedTasks', [ '$location', '$state', '$DataServices', function ($location, $state, $DataServices) {
		return {
			restrict: 'E',
			scope: {
				queue: '&'
			},
			controller: function ($scope, $DataServices) {
				$scope.purge = function() {
				  if (confirm('Do you want to purge all completed tasks?')) {
                      $DataServices.Queue.purgeAllCompleted().then(function(result) {
                          alert('The tasks has been created.');
                      });
                  }
				};
			},
			template: '<button class="btn btn-danger btn-xs" ng-click="purge()"><i class="glyphicon glyphicon-pensil"></i> Purge Completed</button>'
		};
	}]);

};
