module.exports = function (myApp) {

	myApp.directive('userResume', function() {
		'use strict';
		return {
			restrict: 'E',
			scope: {
				user: '='
			},
			controller: function($scope) {},
			template: require('./page.html')
		};
	});

};
