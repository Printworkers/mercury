module.exports = function(myApp) {

    myApp.directive('previewJob', function(Restangular, $q, notification,
        $state) {
        'use strict';
        return {
            restrict: 'E',
            scope: {
                job: '=',
            },
            link: function(scope, element, attrs) {
                scope.jobId = scope.job._identifierValue;
            },
            template: '<a class="btn btn-success btn-xs" target="jobInfo" href="http://app.semperllc.com/#/jobs/{{jobId}}"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></a>'
        };
    });

};
