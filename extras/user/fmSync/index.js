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
                    { title: 'Zip', webfld: 'address_zip', fmfld: 'address_zip' }
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
                    alert('Coming soon');
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

                        console.log('new webData', data);
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
