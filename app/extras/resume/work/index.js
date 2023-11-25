module.exports = function(myApp) {

	myApp.directive('semperWorkHistoryTable', [ 'ModalService', 'Restangular', '$DataServices', function( ModalService, Restangular, $DataServices) {
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
							model: $DataServices.Work.new({ User: $scope.user._id })
						},
						controller: function($scope, Restangular, model, close) {
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
								$scope.fetch();
							});

							$(modal.element).modal({ keyboard: false });
						});
				};

				$scope.delete = function(model) {
					if (confirm('Do you want to delete this?')) {
						model.delete().then(function() {
							var index = $scope.data.indexOf(reference);
							if (index > -1) $scope.data.splice(index, 1);
						});
					}
				};

				$scope.edit = function(model) {
					ModalService.showModal({
						template: require('./modal.html'),
						inputs: {
							model: model
						},
						controller: function($scope, $element, model, title, Restangular, close) {
							$scope.model = model;

							$scope.save = function() {
								model.save().then(function(data){
									close({}, 500);
								}, function(err) {
									console.log(err);
								});
							};
						}}).then(function(modal) {
							$(modal.element).modal({ keyboard: false });
						});
				};

			},
			controller: function($scope, Restangular) {
				$scope.data = [];

				$scope.fetch = function() {
					$DataServices.Work.find($scope.user._id).then(function(data) {
						$scope.data = data;
					});
				};

				$scope.fetch();
			}
		};
	}]);

};
