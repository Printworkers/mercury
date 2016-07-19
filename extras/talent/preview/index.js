module.exports = function(myApp) {

    myApp.directive('previewTalent', function(Restangular, $q, notification,
        $state) {
        'use strict';
        return {
            restrict: 'E',
            scope: {
                talent: '=',
            },
            link: function(scope, element, attrs) {
                scope.talentId = scope.talent._identifierValue;
            },
            template: '<a class="btn btn-success btn-xs" target="jobInfo" href="http://app.semperllc.com/#/talentdetail/{{talentId}}"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></a>'
        };
    });

};
