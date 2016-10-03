module.exports = function (myApp) {

	myApp.directive('queueEditModal', [ 'ModalService', function (ModalService) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				queue: '&',
				class: '@',
				title: '@'
			},
			link: function (scope, globallookups) {

				/* Optional class that controls the size and color. */
				scope.class = scope.class || 'btn btn-xs';

				scope.open = function() {

					scope.queue = scope.queue();

                    scope.jsonString = JSON.stringify(scope.queue.params, undefined, 4);
                    scope.jsonStatus = '';


                    scope.queueStatuses = [
                        { value: 'queued', label: 'Queued' },
                        { value: 'dequeued', label: 'Dequeued' },
                        { value: 'complete', label: 'Complete' },
                        { value: 'failed', label: 'Failed' },
                        { value: 'cancelled', label: 'Cancelled' }
                    ];

					ModalService.showModal({
						template: require('./form.html'),
						scope: scope,
						controller: function($scope) {

            				$scope.$watch('jsonString', function(newValue, oldValue) {
            					if (newValue !== oldValue) {
            						try {
            							var t = JSON.parse(newValue);
            							scope.queue.params = t;
            							scope.jsonStatus = '';
            						} catch(err) {
            							scope.jsonStatus = 'Invalid JSON.';
            						}
            					}
            				});

                            $scope.save = function() {
                                var data = { status: scope.queue.status, params: scope.queue.params };

                                scope.queue.patch(data).then(function(data) {
                                    // Done It saves
                                }, function(err) {
                                    alert('Unable to save.');
                                });
                            };
						}
					}).then(function(modal) {
						modal.element.modal();
						modal.close.then(function(result) {});
					});

				};
			},
			template: '<button class="btn btn-default {{class}}" ng-click="open()"><span class="glyphicon glyphicon-pencil"></span></button>'
		};
	}]);

};
