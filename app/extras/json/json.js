module.exports = function (myApp) {

	myApp.filter('prettyJSON', function () {
		return function(json) { 
			return angular.toJson(json, true); 
		};
	});

	myApp.filter('prettify', function () {
		
		function syntaxHighlight(json) {

			json = JSON.stringify(json, undefined, 4);

			json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
			return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
				var cls = 'number';
				if (/^"/.test(match)) {
					if (/:$/.test(match)) {
						cls = 'key';
					} else {
						cls = 'string';
					}
				} else if (/true|false/.test(match)) {
					cls = 'boolean';
				} else if (/null/.test(match)) {
					cls = 'null';
				}
				return '<span class="' + cls + '">' + match + '</span>';
			});
		}
		
		return syntaxHighlight;
	});

	myApp.directive('jsonViewer', [ '$location', 'ModalService', function ($location, ModalService) {
		return {
			restrict: 'E',
			replace: true,
			scope: { 
				entry: '&',
				class: '@',
				title: '@'
			},
			link: function (scope) {

				/* Optional class that controls the size and color. */
				scope.class = scope.class || 'btn btn-xs';
				scope.title = scope.title || 'JSON';

				scope.open = function() {

					scope.json = scope.entry();

					ModalService.showModal({
						template: require('./json.html'),
						scope: scope,
						controller: function() {
							scope.obj = {
								data: scope.entry,
								options: {}
							};
						}
					}).then(function(modal) {
						modal.element.modal();
						modal.close.then(function(result) {});
					});

				};
			},
			template: '<button class="btn btn-default {{class}}" ng-click="open()"><span class="fa fa-info fa-fw"></span></button>'
		};
	}]);

	myApp.directive('goTo', [ '$state', 'ModalService', function ($state, ModalService) {
		return {
			restrict: 'E',
			scope: { 
				entry: '&',
				title: '@',
				state: '@',
				field: '@'
			},
			link: function (scope) {
				/* Optional class that controls the size and color. */
				scope.class = scope.class || 'btn btn-xs';
				scope.title = scope.title || 'JSON';

				scope.open = function() {
					var data = scope.entry();
					var id = data[scope.field] ||  data.values[scope.field];
					$state.go(scope.state, { id: id });
				};
			},
			template: '<button class="btn btn-default {{class}}" ng-click="open()">{{title}}</button>'
		};
	}]);
};