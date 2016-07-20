module.exports = function (myApp) {

    myApp.directive('fmSyncJob', [ 'ModalService', '$http', 'FMApiUrl', function(ModalService, $http, FMApiUrl) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				job: '&'
			},
			link: function (scope) {
				scope.open = function() {
					ModalService.showModal({
						template: require('./modal.html'),
						scope: scope,
						controller: function($element, close) {
                            scope.id_job = scope.job._identifierValue;

							scope.submit = function() {

								$http({
									method: 'GET',
									url: FMApiUrl + '/job_find_single.php?id_job=' + scope.id_job
								}).then(function successCallback(response) {

									scope.message = 'Got data from FileMaker';

									/* Close the modal. */
									close();
								}, function errorCallback(response) {
									console.log('Got an error', response);
									$scope.errorMessage = 'Unable to get data from Filemaker';
								});

							};
						}
					}).then(function(modal) {
						modal.element.modal();
						modal.close.then(function(result) {});
					});
				};

			},
			template: '<button class="btn btn-primary btn-xs" ng-click="open()"><i class="fa fa-download"></i></button>'
		};
	}]);

};
