module.exports = function (myApp) {

	myApp.directive('userDetails', function(notification) {
		'use strict';
		return {
			restrict: 'E',
			scope: {
				user: '='
			},
			controller: function($scope, usState, source, yesno, booleanYesNo, homeOffice) {
				$scope.user = $scope.user;

				$scope.lookups = {
					state: usState,
					source: source,
					yesno: yesno,
					status_dev: [
						{ value: 0, label: 'Pre-Process (Employee No Contact) (0)' },
						{ value: 1, label: 'In-Process (1)' },
						{ value: 2, label: 'In-Process (2)' },
						{ value: 3, label: 'Employee Scheduled (3)' },
						{ value: 4, label: 'Interviewed and Tested (4)' },
						{ value: 5, label: 'Reference List (5)' },
						{ value: 6, label: 'Clear List (6)' },
						{ value: 7, label: 'Available. Read for Placement (7)' }
					],
					booleanYesNo: booleanYesNo,
					ra_stage_status: [
						{ value: 'open', label: 'Open' },
						{ value: 'closed', label: 'Closed' },
						{ value: 'processing', label: 'Processing' }
					],
					userTypes: [
						{ value: 'job seeker', label: 'Job Seeker' },
						{ value: 'employer', label: 'Employer' },
						{ value: 'administrator', label: 'Administator' },
						{ value: 'super', label: 'Administator Super' },
					],
					homeOffices: homeOffice
				};

				$scope.save = function() {
					$scope.user.save().then(function(data) {
						/* Send the notification. */
						notification.log('Updated User Details', { addnCls: 'humane-flatty-success' });
					}, function(err) {
						/* Echo to the console. */
						console.error('Error', err);

						notification.log('Unable to save user details.', { addnCls: 'humane-flatty-error' });
					});
				};

			},
			template: require('./form.html')
		};
	});

};
