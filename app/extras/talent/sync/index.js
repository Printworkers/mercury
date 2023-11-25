module.exports = function (myApp) {

    myApp.directive('fmSyncTalent', [ 'ModalService', '$http', function(ModalService, $http) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				talent: '&'
			},
			link: function (scope) {
				scope.open = function() {
					ModalService.showModal({
						template: require('./modal.html'),
						scope: scope,
						controller: function($element, close) {
							var id = scope.talent().values.fmJobId;
                            scope.talentId = scope.talent._identifierValue;

							scope.submit = function() {

								var id = scope.talentId;
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
			template: '<button class="btn btn-primary btn-xs" ng-click="open()"><i class="fa fa-download"></i></button>'
		};
	}]);

};
