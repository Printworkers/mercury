module.exports = function(ngModule) {

	ngModule.directive('semperEmployeeObjectives', [ 'ModalService', function( ModalService) {
		return {
			replace: true,
			scope: {
				user: '='
			},
			template: require('./table.html'),
			controller: function($scope) {
				$scope.details = $scope.user;

				$scope.editPersonalInterests = function() {
					ModalService.showModal({
						template: require('./modal.html'),
						inputs: {
							user: $scope.user,
							title: 'Personal Interests',
							content: $scope.user.personalInterests
						},
						controller: function($scope, title, content, user, close) {
							$scope.title = title;
							$scope.content = content;
							$scope.save = function() {
								user.customPUT({ personalInterests: $scope.content } ).then(function(data){
									user.personalInterests = $scope.content;
									close({}, 500);
								}, function(err) {
									console.log(err);
								});
							};
						}}).then(function(modal) {
							$(modal.element).modal({ keyboard: false });
						});
				};

				$scope.editSpecialSkills = function() {
					ModalService.showModal({
						template: require('./modal.html'),
						inputs: {
							user: $scope.user,
							title: 'Special Skills',
							content: $scope.user.specialSkills
						},
						controller: function($scope, title, content, user, close) {
							/* Setup the save function. */
							$scope.title = title;
							$scope.content = content;
							$scope.save = function() {
								user.customPUT({ specialSkills: $scope.content } ).then(function(data){
									user.specialSkills = $scope.content;
									close({}, 500);
								}, function(err) {
									console.log(err);
								});
							};
						}}).then(function(modal) {
							$(modal.element).modal({ keyboard: false });
						});
				};

				$scope.editCareerObjectives = function() {
					ModalService.showModal({
						template: require('./modal.html'),
						inputs: {
							user: $scope.user,
							title: 'Career Objectives',
							content: $scope.user.careerObjectives
						},
						controller: function($scope, title, content, user, close) {
							/* Setup the save function. */
							$scope.title = title;
							$scope.content = content;
							$scope.save = function() {
								user.customPUT({ careerObjectives: $scope.content } ).then(function(data){
									user.careerObjectives = $scope.content;

									close({}, 500);
								}, function(err) {
									console.log(err);
								});
							};
						}}).then(function(modal) {
							$(modal.element).modal({ keyboard: false });
						});
				};
			}
		};
	}]);

};
