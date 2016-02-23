module.exports = function(myApp) {
    myApp.directive('dashboard', function() {
        return {
            templateUrl: 'dashboard.html'
        };
    });
};