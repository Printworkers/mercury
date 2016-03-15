module.exports = function(myApp) {


	myApp.config(function(RestangularProvider, apiUrl) {

		RestangularProvider.setBaseUrl(apiUrl);
		RestangularProvider.setDefaultHeaders({'x-access-token': localStorage.getItem('semper-admin-token') }); 	
		RestangularProvider.setRestangularFields({ id: '_id' });

		RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response) {
			if (operation == "getList") {
				response.totalCount = data.total;
			}
			return data;
		});
		
		RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
			var extractedData = {};
			// .. to look for getList operations
			if (operation === "getList") {
				_.defaults(extractedData, data);
				// .. and handle the data and meta data
				extractedData = data.data;
			}
			else {
				extractedData = data;
			}

			return extractedData;
		});

		RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params, httpConfig) {

			if (operation == 'getList' ) {
				if (params._filters) {
					for (var filter in params._filters) {
						params[filter] = params._filters[filter];
					}
					delete params._filters;
				}

				if (params._page) params.page = params._page;
				if (params._perPage) params.limit = params._perPage;
				if (params._sortField) params.sortField = params._sortField;
				if (params._sortDir) params.sortDir = params._sortDir;

				delete params._page;
				delete params._perPage;
				delete params._sortField;
				delete params._sortDir;
			}

			return { params: params, headers: headers };
		});

	});

};