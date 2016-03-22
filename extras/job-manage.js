module.exports = function (myApp) {

	myApp.directive('fmSyncJob', [ 'ModalService', '$http', function(ModalService, $http) {
		return {
			restrict: 'E',
			replace: true,
			scope: { 
				job: '&' 
			},
			link: function (scope) {
				scope.open = function() {
					ModalService.showModal({
						template: require('../templates/job-sync-from-filemaker.html'),
						scope: scope,
						controller: function($element, close) {
							var id = scope.job().values.fmJobId;

							scope.submit = function() {

								var id = '44413';
								var url = 'https://semperpages-jrr316.c9users.io/SingleJob.php?jobID=' + id;

								$http({
									method: 'GET',
									url: url
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
			template: '<button class="btn btn-primary btn-xs" ng-click="open()"><i class="fa fa-download"></i>&nbsp;FM Sync</button>'
		};
	}]);

};