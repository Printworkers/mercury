module.exports = function (myApp) {


	myApp.directive('agentDetails', function(notification, $DataServices) {
		'use strict';
		return {
			restrict: 'E',
			scope: {
				agent: '='
			},
			controller: function($scope, globallookups, salaryid, shiftid, typejobid, calc_work_type) {

				$scope.agent = $scope.agent;
				$scope.globallookups = globallookups;

				$scope.lookups = {
					salary: salaryid,
					shift: shiftid,
					work: calc_work_type
				};

				$DataServices.Skill.all().then(function(data) {
					$scope.lookups.skills = _.map(data, function(d) {
						d.label = d.primary;
						d.value = d.primary;
						return d;
					});
					$scope.lookups.skills.unshift({ label: '<Any Skill>', value: '' });
				});

				$DataServices.HomeOffice.all().then(function(data) {
					$scope.lookups.homeoffice = data;
					$scope.lookups.homeoffice.unshift({ name_office: '<Any Office>', id_office: '' });
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
