module.exports = function (myApp) {


	myApp.directive('agentDetails', function(notification, $DataServices) {
		'use strict';
		return {
			restrict: 'E',
			scope: {
				agent: '='
			},
			controller: function($scope, globallookups, salaryid, shiftid, typejobid) {

				$scope.agent = $scope.agent;
				$scope.globallookups = globallookups;

				$scope.lookups = {
					salary: salaryid,
					shift: shiftid,
					typejob: typejobid
				};

				$DataServices.Skill.all().then(function(data) {
					$scope.lookups.skills = data;
				});

				$DataServices.HomeOffice.all().then(function(data) {
					$scope.lookups.homeoffice = data;
				});

				$scope.save = function() {
					$scope.agent.save().then(function(data) {
						/* Send the notification. */
						notification.log('Updated Agent Details', { addnCls: 'humane-flatty-success' });
					}, function(err) {
						/* Echo to the console. */
						console.error('Error', err);

						notification.log('Unable to save Agent details.', { addnCls: 'humane-flatty-error' });
					});
				};

			},
			template: require('./form.html')
		};
	});

};
