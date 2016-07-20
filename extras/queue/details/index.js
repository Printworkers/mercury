module.exports = function (myApp) {


	myApp.directive('queueDetails', function(notification) {
		'use strict';
		return {
			restrict: 'E',
			scope: {
				queue: '='
			},
			controller: function($scope, globallookups) {
				$scope.queue = $scope.queue;
				$scope.globallookups = globallookups;

				$scope.jsonString = JSON.stringify($scope.queue.params, undefined, 4);
				$scope.jsonStatus = '';

				$scope.$watch('jsonString', function(newValue, oldValue) {
					if (newValue !== oldValue) {
						try {
							var t = JSON.parse(newValue);
							$scope.queue.params = t;
							$scope.jsonStatus = '';
						} catch(err) {
							$scope.jsonStatus = 'Invalid JSON.';
						}
					}
				});

				$scope.save = function() {
					$scope.queue.save().then(function(data) {
						/* Send the notification. */
						notification.log('Updated Queue Details', { addnCls: 'humane-flatty-success' });
					}, function(err) {
						/* Echo to the console. */
						console.error('Error', err);

						notification.log('Unable to save Queue details.', { addnCls: 'humane-flatty-error' });
					});
				};

			},
			template: require('./form.html')
		};
	});

};
