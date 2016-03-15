module.exports = function(myApp) {

	myApp.config(['tbkKeenConfigProvider', function(tbkKeenConfigProvider) {
		var config = {
			projectId: "56ba2de259949a03c0080726",
			readKey: "0e0c7398282ccd8ff1f24e9822e038a2180560c2867890cd099ee10517c5279be8febb3c2de2700ea904b44281bc72b1c92e2a3b305c4d58c088d43f7426b2949dd146bf00d562739d252ed54c0e5c35d08586d051fad4d4b1fd2a19ac85b124"
		};

		tbkKeenConfigProvider.projectId(config.projectId).readKey(config.readKey);
	}]);

};