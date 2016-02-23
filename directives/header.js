module.exports = function(myApp) {
    myApp.directive('header', function() {
        return {
            templateUrl: 'header.html',
            controller: function($scope, Restangular) {
                Restangular.all('user').customGET('current').then(
                    function(data) {
                        $scope.user = data.data;
                    });
                $scope.logout = function() {
                    if (confirm('Do you want to logout?')) {
                        localStorage.removeItem('semper-admin-token');
                        window.location = './index.html';
                    }
                };
            }
        };
    });
};