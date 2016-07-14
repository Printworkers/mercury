module.exports = function (myApp) {

    myApp.directive('userFilemakerDetails', function($http, FMApiUrl) {
		'use strict';
		return {
			restrict: 'E',
			scope: {
				user: '='
			},
			controller: function($scope, Restangular) {
				$scope.errorMessage = '';
				$scope.userData = $scope.user;
				$scope.hasEmployeeId = false;

                $scope.fields = [
                    { title: 'First Name', webfld: 'name_first', fmfld: 'name_first' },
                    { title: 'Last Name', webfld: 'name_last', fmfld: 'name_last' },
                    { title: 'Middle Name', webfld: 'name_middle', fmfld: 'name_middle' },
                    { title: 'Email', webfld: 'email', fmfld: 'email' },
                    { title: 'Phone', webfld: 'phone', fmfld: 'phone' },
                    { title: 'Address Line 1', webfld: 'address_1', fmfld: 'address_1' },
                    { title: 'Address Line 2', webfld: 'address_2', fmfld: 'address_2' },
                    { title: 'City', webfld: 'address_city', fmfld: 'address_city' },
                    { title: 'State', webfld: 'address_state', fmfld: 'address_state' },
                    { title: 'Zip', webfld: 'address_zip', fmfld: 'address_zip' },
                    { title: 'travel_time', webfld: 'travel_time', fmfld: 'travel_time' },
                    { title: 'staff_recruiter', webfld: 'staff_recruiter', fmfld: 'staff_recruiter' },
                    { title: 'flag_no_email', webfld: 'flag_no_email', fmfld: 'flag_no_email' },
                    { title: 'transportation', webfld: 'transportation', fmfld: 'transportation' },
                    { title: 'region_work', webfld: 'region_work', fmfld: 'region_work' },
                    { title: 'shifts', webfld: 'shifts', fmfld: 'shifts' },
                    { title: 'app_working_company', webfld: 'app_working_company', fmfld: 'app_working_company' },
                    { title: 'Reason for Leaving Last', webfld: 'app_reason_leave_last', fmfld: 'app_reason_leave_last' },
                    { title: 'flag_union', webfld: 'flag_union', fmfld: 'flag_union' },
                    { title: 'source', webfld: 'source', fmfld: 'source' },
                    { title: 'app_career_accomp', webfld: 'app_career_accomp', fmfld: 'app_career_accomp' },
                    { title: 'app_company_prefer_not_contact', webfld: 'app_company_prefer_not_contact', fmfld: 'app_company_prefer_not_contact' },
                    { title: 'app_industry', webfld: 'app_industry', fmfld: 'app_industry' },
                    { title: 'pay_rate_desired', webfld: 'pay_rate_desired', fmfld: 'pay_rate_desired' },
                    { title: 'app_why_semper', webfld: 'app_why_semper', fmfld: 'app_why_semper' },
                    { title: 'app_what_heard_semper', webfld: 'app_what_heard_semper', fmfld: 'app_what_heard_semper' },
                    { title: 'app_be_in_five_years', webfld: 'app_be_in_five_years', fmfld: 'app_be_in_five_years' },
                    { title: 'flag_relocate_willing', webfld: 'flag_relocate_willing', fmfld: 'flag_relocate_willing' }
                ];

                $scope.saveToWeb = false;
                $scope.saveToFM = false;

                $scope.saveDataToWeb = function() {
                    if (confirm('Are you sure you want to save data to the users web account?')) {
                        $scope.userData.save().then(function(data) {
                            $scope.saveToWeb = false;
                        });
                    }
                };

                $scope.saveDataToFM = function() {
                    if (confirm('Are you sure you want to save data to the filemaker?')) {
                        var data = {};
                        _.each($scope.fields, function(fld) {
                            /* Only save to FM when we have data. */
                            if ($scope.userData[fld.webfld]) {
                                data[fld.fmfld] = $scope.userData[fld.webfld];
                            }
                        });

                        delete data.region_work;
                        delete data.shifts;

                        /* Add in the keys needs to save. */
                        data.id_employee = $scope.user.id_employee;
                        data.webId = $scope.user._id;

                        $scope.userData.customPUT({ data: data }, 'filemaker').then(function(resp) {
                            $scope.fmData = resp.result;
                        }, function(err) {
                            $scope.errorMessage = 'Unable to save data from Filemaker';
                        });
                    }
                };

                $scope.useAllFM = function() {
                    if (confirm('Are you sure you want to save all the File Maker Data to the web account?')) {
                        var data = {};
                        _.each($scope.fields, function(fld) {
                            /* Only save to FM when we have data. */
                            if ($scope.fmData[fld.fmfld]) {
                                data[fld.webfld] = $scope.fmData[fld.fmfld];
                            }
                        });

                        $scope.userData.save(data).then(function(data) {
                            console.log('All Data was saved');
                        });
                    }
                };

                $scope.useAllWeb = function() {
                    if (confirm('Are you sure you want to save all the Web Data  Data to the filemaker?')) {
                        var data = {};
                        _.each($scope.fields, function(fld) {
                            /* Only save to FM when we have data. */
                            if ($scope.userData[fld.webfld]) {
                                data[fld.fmfld] = $scope.userData[fld.webfld];
                            }
                        });

                        delete data.region_work;
                        delete data.shifts;

                        /* Add in the keys needs to save. */
                        data.id_employee = $scope.user.id_employee;
                        data.webId = $scope.user._id;

                        $scope.userData.customPUT({ data: data }, 'filemaker').then(function(resp) {
                            $scope.fmData = resp.result;
                        }, function(err) {
                            $scope.errorMessage = 'Unable to get data from Filemaker';
                        });
                    }
                };

                $scope.useLeft = function(fld) {
                    $scope.fmData[fld.fmfld] = $scope.user[fld.webfld];
                    $scope.saveToFM = true;
                };

                $scope.useRight = function(fld) {
                    $scope.user[fld.webfld] = $scope.fmData[fld.fmfld];
                    $scope.saveToWeb = true;
                };

                $scope.showDiff = function(fld) {
                    var w = $scope.user[fld.webfld];
                    var f = $scope.fmData[fld.fmfld];

                    if (w !== f) {
                        return '=';
                    } else {
                        return '<>';
                    }
                };

				if ($scope.user.id_employee) {
					$scope.hasEmployeeId = true;

					var get = function() {
						var id = $scope.user.id_employee;
						var url = FMApiUrl + '/user_find_single.php?id_employee=' + id;

						$http({
							method: 'GET',
							url: url
						}).then(function successCallback(response) {
							$scope.fmData = response.data;
							$scope.message = '';
						}, function errorCallback(response) {
							console.log('ERROR 1', response);
							$scope.errorMessage = 'Unable to get data from Filemaker';
						});
					};

					get();
				} else {
					$scope.errorMessage = 'This web account does not have a File Maker ID';
				}

			},
			template: require('./form.html')
		};
	});

};
