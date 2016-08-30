var _ = require('lodash');

module.exports = function(myApp) {
    myApp.directive('dashboard', function() {
        return {
            templateUrl: 'dashboard.html',
            controller: function($scope, apiUrl, $http) {
            	var stats = ['agent', 'application', 'homeOffice', 'job', 'order', 'work', 'education', 'document', 'user', 'lookup', 'template', 'skill'];
            	_.map(stats, function(stat) {
	                $http.get(apiUrl + stat + "/count", {headers: {'x-access-token': localStorage.getItem('semper-admin-token') }}).then(function (response) {
						$scope[stat] = response.data.count;
					});
            	});
            }
        };
    });
};
