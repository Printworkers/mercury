module.exports = function(myApp) {

	myApp.directive('semperDocumentsTable', [ 'ModalService', '$DataServices', '$timeout', function( ModalService, $DataServices, $timeout) {
		return {
            scope: {
                user: '='
            },
			replace: true,
			template: require('./table.html'),
			controllerAs: 'ctrl',
			link: function ($scope, element, attrs) {
				var user = $scope.user;

				$scope.add = function() {
					ModalService.showModal({
						template: require('./modal.html'),
						inputs: {
							model: $DataServices.Document.new({ User: $scope.user._id })
						},
						controller: function($scope, model, close) {
							$scope.model = model;

							$scope.save = function() {
								model.add().then(function(data){
									close({}, 500);
								}, function(err) {
									console.log(err);
								});
							};
						}}).then(function(modal) {
							modal.close.then(function(result) {
								$timeout(function() {
									$scope.fetch();
								}, 1000);
							});

							$(modal.element).modal({ keyboard: false });
						});
				};

				$scope.delete = function(model) {
					if (confirm('Do you want to delete this?')) {
						model.delete().then(function() {
							var index = $scope.data.indexOf(model);
							if (index > -1) $scope.data.splice(index, 1);
						});
					}
				};
			},
			controller: function($scope) {
				$scope.data = [];

				$scope.fetch = function() {
					$DataServices.Document.find($scope.user._id).then(function(data) {
						$scope.data = data;
					});
				};

				$scope.$on('documentUploadEvent', function() {
					$scope.fetch();
				});

				$scope.fetch();
			}
		};
	}]);

    /* Directive that provides a upload feature for resume documnts. */

    myApp.directive('semperDocumentUpload', [ 'ModalService', '$rootScope', 'Upload', '$timeout', function(ModalService, $rootScope, Upload, $timeout) {
        return {
            replace: true,
            template: require('./form.html'),
            controllerAs: 'ctrl',
            scope: {
				user: '='
			},
            link: function ($scope, element, attrs) {

                /* Function to allow for the upload of a resume file. */
                $scope.upload = function(file, errFiles) {
                    $scope.f = file;
					$scope.today = new Date();
					$scope.errFile = errFiles && errFiles[0];

					if (file) {
						file.upload = Upload.upload({
							url: 'https://api.semperllc.com/document',
							headers: { 'x-access-token': localStorage.getItem('token') || 'test' },
							data: { file: file, User: $scope.user._id }
						});

						file.upload.then(function (response) {
							$timeout(function () {
								file.result = response.data;

                                /* Trigger an event to let the parent know it has more data. */
                                $scope.$emit('documentUploadEvent', response.data);
							}, 1000);
						}, function (response) {
							if (response.status > 0)
								$scope.errorMsg = response.status + ': ' + response.data;
						}, function (evt) {
							file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
						});
					}
                };

            }
        };
    }]);

};
