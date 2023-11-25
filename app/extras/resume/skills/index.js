module.exports = function(ngModule) {

	ngModule.controller('SkillTableController', ['$scope', '$DataServices', '$element', 'close', '$DataServices',
		function($scope, $element, Restangular, close, $DataServices) {

			var user = $scope.user;

			$scope.skill = {
				skill_1_year: user.skill_1_year || '',
				skill_2_year: user.skill_2_year || '',
				skill_3_year: user.skill_3_year || '',
				skill_1_primary: user.skill_1_primary || '',
				skill_2_primary: user.skill_2_primary || '',
				skill_3_primary: user.skill_3_primary || '',
				skill_1_secondary: user.skill_1_secondary || '',
				skill_2_secondary: user.skill_2_secondary || '',
				skill_3_secondary: user.skill_3_secondary || ''
			};

			$scope.currentId = $scope.user;

			$DataServices.Skill.all().then(function(data) {
				$scope.skillGroups = _.groupBy(data, function(num){
					return num.primary;
				});

				$scope.primarySkills = _.keys($scope.skillGroups).sort();
			});
	}]);

	ngModule.directive('semperSkillsTable', [ 'ModalService', function( ModalService) {
		return {
			replace: true,
			template: require('./table.html'),
			controllerAs: 'ctrl',
			scope: {
                user: '='
            },
			controller: function ($scope) {
				$scope.skills = $scope.user;

				/* Provides the option to edit the skills. */
				$scope.edit = function() {

					ModalService.showModal({
						template: require('./modal.html'),
                        inputs: {
                            user: $scope.user
                        },
						controller: function($scope, user, close, $DataServices) {
                            $scope.use = user;

							$scope.skill = {
								skill_1_year: user.skill_1_year || '',
								skill_2_year: user.skill_2_year || '',
								skill_3_year: user.skill_3_year || '',
								skill_1_primary: user.skill_1_primary || '',
								skill_2_primary: user.skill_2_primary || '',
								skill_3_primary: user.skill_3_primary || '',
								skill_1_secondary: user.skill_1_secondary || '',
								skill_2_secondary: user.skill_2_secondary || '',
								skill_3_secondary: user.skill_3_secondary || ''
							};

							$DataServices.Skill.all().then(function(data) {
								$scope.skillGroups = _.groupBy(data, function(num){
									return num.primary;
								});

								$scope.primarySkills = _.keys($scope.skillGroups).sort();
							});

							$scope.save = function() {
								user.save({ skill_1_primary: 111 }).then(function(data){
									close({ skills: $scope.skill }, 500);
								}, function(err) {
									console.log(err);
								});
							};

						}}).then(function(modal) {
							modal.close.then(function(result) {
								$scope.skills = result.skills;
							});
							$(modal.element).modal({ keyboard: false });
						});
					};
			}
		};
	}]);

};
