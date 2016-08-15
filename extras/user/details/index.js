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
						{ value: 0, label: 'Pre-Process (Employee No Contact)' },
						{ value: 1, label: 'In-Process' },
						{ value: 2, label: 'In-Process' },
						{ value: 3, label: 'Employee Scheduled' },
						{ value: 4, label: 'Interviewed and Tested' },
						{ value: 5, label: 'Reference List' },
						{ value: 6, label: 'Clear List' },
						{ value: 7, label: 'Available. Read for Placement' }
					],
					booleanYesNo: booleanYesNo,
					ra_app_statuses: [
						{ value: 'phase1_open', label: 'Phase 1 Open' },
						{ value: 'phase1_pending', label: 'Phase 1 Processing' },
						{ value: 'phase1_signing', label: 'Phase 1 Signing' },
						{ value: 'phase1_complete', label: 'Phase 1 Complete' },
						{ value: 'phase2_open', label: 'Phase 2 Open (Elegibility)' },
						{ value: 'phase2_pending', label: 'Phase 2 Processing (Elegibility)' },
						{ value: 'phase2_signing', label: 'Phase 2 Signing' },
						{ value: 'closed', label: 'Closed' }
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
