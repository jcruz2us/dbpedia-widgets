(function(){
	'use strict';

	function resource($http, proxyLocation) {
		return {
			fetch: function (uri) {
				return $http.get(proxyLocation + "/" + uri);
			}
		};
	}

	angular.module('gulp-ng')
		.value('proxyLocation', 'http://107.170.195.163:8000/resource')
		.factory('resource', resource);
})();