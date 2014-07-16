(function(){
	'use strict';

	angular.module('gulp-ng', [ 'ngRoute','gulp-ng-main','templates' ])
		.config(function ($routeProvider) {
			
			$routeProvider
				.otherwise({
					redirectTo: '/'
				});
		
		});
})();
(function(){

	'use strict';

	angular.module('gulp-ng')
			.controller('ApplicationCtrl', ['$scope', '$location', function ($scope, $location) {
				//$scope.resourceSelected = {};
				$scope.$watch('resourceSelected', function (newVal, oldVal) {
					if (newVal === oldVal){ //no change
						return;
					}

					$location.path('/detail');
					$location.search('uri', newVal.uri);
				});
			}]);
})();
(function () {
	'use strict';


	angular.module('gulp-ng')
		.config(function ($routeProvider) {
			$routeProvider
				.when('/detail', {
					templateUrl: 'detail/detail.html',
					controller: 'DetailCtrl'
				});
		})
		.controller('DetailCtrl', function ($scope, $routeParams, resource) {
			$scope.uri = $routeParams.uri;
			resource.fetch($scope.uri).then(function (response) {
				$scope.resource = response.data;
			});
		});
})();
(function(){
  'use strict';


  angular.module('gulp-ng-main',['ngRoute'])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'main/main.html',
          controller: 'MainCtrl'
        });
    })
    .controller('MainCtrl', function () {
    });

})();
(function(){
	'use strict';

	function dbpediaDepiction() {
		return {
			restrict: 'A',
			scope: {
				resource: '='
			},
			link: function (scope, element) {
				//try to list first the thumbnail
				var image = new Image();

				//the event handlers should be defined before
				//attempting to load the image. This will cause the event to fire event for 
				//cached images
				//http://fragged.org/preloading-images-using-javascript-the-right-way-and-without-frameworks_744.html
				image.onload = function () {
					element.attr('src', scope.resource.thumbnail);
				};

				image.onerror = function () {
				};

				image.src = scope.resource.thumbnail;
				// im
				//if that fails load the full depiction

				//if all fails remove image completely
			}
		};
	}

	angular.module('gulp-ng')
		.directive('dbpediaDepiction', dbpediaDepiction);

})();
(function(){
	'use strict';

	function dbpediaDiscreteFact() {
		return {
			restrict: 'E',
			template: 
				'<label class="predicate">{{fact.predicate.label}}</label>' +
				'<div class="object">' +
					'<ul>' + 
						'<li ng-repeat="object in fact.objects">' +
							'<span ng-if="isDate(object)">{{parseDate(object)}}</span>' +
							'<span ng-if="isLiteral(object)">{{object.value}}</span>' +
							'<a ng-if="isURI(object)" href="/#/detail?uri={{object.value}}">{{object.label}}</a>' +
						'</li>' +
					'<ul>' +
				'</div>',
			scope: {
				fact: '='
			},
			link: function (scope) {
				scope.isURI = function (obj) {
					return obj.type === 'uri';	
				};

				scope.isDate = function (obj) {
					return obj.type === 'typed-literal' && obj.datatype === 'http://www.w3.org/2001/XMLSchema#date';
				};

				scope.isLiteral = function (obj) {
					return obj.type === 'literal';
				};

				scope.parseDate = function (obj) {
					var matches = obj.value.match(/(\d{4})-(\d{2})-(\d{2})/);
					var year = matches[1];
					var month = matches[2];
					var day = matches[3];
					return month + '/' + day + '/' + year;
				};

				
			}
		};
	}

	angular.module('gulp-ng')
		.directive('dbpediaDiscreteFact', dbpediaDiscreteFact);
})();
(function(){
	'use strict';

	function dbpediaGroupedFacts() {
		return {
			restrict: 'E',
			template: 
				'<label ng-if="facts.id">{{facts.id}}</label>' +
				'<ul>' + 
					'<li ng-repeat="fact in facts.facts">' +
						'<dbpedia-discrete-fact fact="fact">' +
						'</dbpedia-discrete-fact>' +
					'</li>' +
				'</ul>',
			scope: {
				facts: '='		//two-way parent scope binding
			}
		};
	}

	angular.module('gulp-ng')
		.directive('dbpediaGroupedFacts', dbpediaGroupedFacts);
})();
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
(function(){
	'use strict';

	function dbpediaResourceView() {
		return {
			restrict: 'E',
			template: 
			//'<div class="wrapper" ng-if="results">' +
				'<img dbpedia-depiction resource="resource" />' +
				'<label class="heading">{{ resource.label }}</label>'+
				'<p class="comment">{{ resource.comment }}</p>' + 
				'<div class="clear"></div>' + 
				'<ul>' +
					'<li ng-repeat="groupedFacts in resource.facts">' + 
						'<dbpedia-grouped-facts facts="groupedFacts">' +
						'</dbpedia-grouped-facts>' +
					'</li>' +
				'</ul>',
			//'</div>',
			scope: {
				resource: '='		//two-way parent scope binding
			}
		};
	}

	angular.module('gulp-ng')
		.directive('dbpediaResourceView', dbpediaResourceView);
})();
(function(){
	'use strict';

	function dbpediaAutosuggest() {
		return {
			restrict: 'E',
			replace: true,
			template: '<input type="text" placeholder="{{placeholder}}" />',
			scope: {
				placeholder: '@', 	//one-way attribute binding
				selection: '='		//two-way parent scope binding
			},
			link: function (scope, element) {

				element.on('dbpedia.select', function (e, value) {
					scope.$apply(function () {
						scope.selection = value;
					});
				});

				element.dbpediaAutosuggest();
			}
		};
	}

	angular.module('gulp-ng')
		.directive('dbpediaAutosuggest', dbpediaAutosuggest);
})();