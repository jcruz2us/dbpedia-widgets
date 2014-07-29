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
			.controller('ApplicationCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
				$scope.embed = $location.search().embed === 'true';

				//$scope.resourceSelected = {};
				$scope.$watch('resourceSelected', function (newVal, oldVal) {
					if (newVal === oldVal){ //no change
						return;
					}

					$location.path('/detail');
					$location.search('uri', newVal.uri);
				});

				$scope.$on('$routeChangeSuccess', function (evnt) {
					$window.ga('send', 'pageview', $location.url());
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

// 			$scope.resource = {
//     "thumbnail": "http://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Rakim_at_Paid_Dues_4.jpg/200px-Rakim_at_Paid_Dues_4.jpg",
//     "abstract": "William Michael Griffin Jr. (born January 28, 1968), known by his stage name Rakim, is an American rapper. One half of golden age hip hop duo Eric B. & Rakim, he is widely regarded as one of the most influential and most skilled MCs of all time. Eric B. & Rakim's classic album Paid in Full was named the greatest hip hop album of all time by MTV in 2006, while Rakim himself was ranked #4 on MTV's list of the Greatest MCs of All Time. Steve Huey of Allmusic stated that \"Rakim is near-universally acknowledged as one of the greatest MCs -- perhaps the greatest -- of all time within the hip-hop community. \" The editors of About. com ranked him #1 on their list of the Top 50 MCs of Our Time (1987–2007). Rakim began his career as the emcee of the rap duo Eric B. & Rakim, who in 2011 were nominated for induction into the Rock and Roll Hall of Fame. In 2012, The Source ranked him #1 on their list of the Top 50 Lyricists of All Time.",
//     "facts": [
//         {
//             "id": "Person",
//             "facts": [
//                 {
//                     "predicate": {
//                         "label": "Occupation",
//                         "value": "http://dbpedia.org/ontology/occupation"
//                     },
//                     "objects": [
//                         {
//                             "label": "Rapping",
//                             "type": "uri",
//                             "value": "http://dbpedia.org/resource/Rapping"
//                         }
//                     ]
//                 },
//                 {
//                     "predicate": {
//                         "label": "Birth Place",
//                         "value": "http://dbpedia.org/ontology/birthPlace"
//                     },
//                     "objects": [
//                         {
//                             "label": "Long Island",
//                             "type": "uri",
//                             "value": "http://dbpedia.org/resource/Long_Island"
//                         },
//                         {
//                             "label": "Wyandanch, New York",
//                             "type": "uri",
//                             "value": "http://dbpedia.org/resource/Wyandanch,_New_York"
//                         },
//                         {
//                             "label": "New York",
//                             "type": "uri",
//                             "value": "http://dbpedia.org/resource/New_York"
//                         }
//                     ]
//                 },
//                 {
//                     "predicate": {
//                         "label": "Birth Date",
//                         "value": "http://dbpedia.org/ontology/birthDate"
//                     },
//                     "objects": [
//                         {
//                             "type": "typed-literal",
//                             "value": "1968-01-27+02:00",
//                             "datatype": "http://www.w3.org/2001/XMLSchema#date"
//                         }
//                     ]
//                 }
//             ]
//         },
//         {
//             "id": "Musical Artist",
//             "facts": [
//                 {
//                     "predicate": {
//                         "label": "Genre",
//                         "value": [
//                             "http://dbpedia.org/ontology/genre",
//                             "http://dbpedia.org/property/genre"
//                         ]
//                     },
//                     "objects": [
//                         {
//                             "label": "Hip hop music",
//                             "type": "uri",
//                             "value": "http://dbpedia.org/resource/Hip_hop_music"
//                         }
//                     ]
//                 },
//                 {
//                     "predicate": {
//                         "label": "Record Label",
//                         "value": "http://dbpedia.org/ontology/recordLabel"
//                     },
//                     "objects": [
//                         {
//                             "label": "Island Records",
//                             "type": "uri",
//                             "value": "http://dbpedia.org/resource/Island_Records"
//                         },
//                         {
//                             "label": "4th & B'way Records",
//                             "type": "uri",
//                             "value": "http://dbpedia.org/resource/4th_&_B'way_Records"
//                         },
//                         {
//                             "label": "Aftermath Entertainment",
//                             "type": "uri",
//                             "value": "http://dbpedia.org/resource/Aftermath_Entertainment"
//                         },
//                         {
//                             "label": "MCA Records",
//                             "type": "uri",
//                             "value": "http://dbpedia.org/resource/MCA_Records"
//                         }
//                     ]
//                 },
//                 {
//                     "predicate": {
//                         "label": "Associated Artist",
//                         "value": [
//                             "http://dbpedia.org/ontology/associatedMusicalArtist",
//                             "http://dbpedia.org/property/associatedActs",
//                             "http://dbpedia.org/ontology/associatedBand"
//                         ]
//                     },
//                     "objects": [
//                         {
//                             "label": "DJ Premier",
//                             "type": "uri",
//                             "value": "http://dbpedia.org/resource/DJ_Premier"
//                         },
//                         {
//                             "label": "Pete Rock",
//                             "type": "uri",
//                             "value": "http://dbpedia.org/resource/Pete_Rock"
//                         },
//                         {
//                             "label": "Eric B. & Rakim",
//                             "type": "uri",
//                             "value": "http://dbpedia.org/resource/Eric_B._&_Rakim"
//                         },
//                         {
//                             "label": "Kool G Rap",
//                             "type": "uri",
//                             "value": "http://dbpedia.org/resource/Kool_G_Rap"
//                         },
//                         {
//                             "label": "Large Professor",
//                             "type": "uri",
//                             "value": "http://dbpedia.org/resource/Large_Professor"
//                         },
//                         {
//                             "label": "Big Daddy Kane",
//                             "type": "uri",
//                             "value": "http://dbpedia.org/resource/Big_Daddy_Kane"
//                         },
//                         {
//                             "label": "Marley Marl",
//                             "type": "uri",
//                             "value": "http://dbpedia.org/resource/Marley_Marl"
//                         },
//                         {
//                             "label": "Gang Starr",
//                             "type": "uri",
//                             "value": "http://dbpedia.org/resource/Gang_Starr"
//                         },
//                         {
//                             "label": "KRS-One",
//                             "type": "uri",
//                             "value": "http://dbpedia.org/resource/KRS-One"
//                         },
//                         {
//                             "label": "Clark Kent (producer)",
//                             "type": "uri",
//                             "value": "http://dbpedia.org/resource/Clark_Kent_(producer)"
//                         }
//                     ]
//                 }
//             ]
//         }
//     ],
//     "label": "Rakim",
//     "depiction": "http://upload.wikimedia.org/wikipedia/commons/7/78/Rakim_at_Paid_Dues_4.jpg",
//     "comment": "William Michael Griffin Jr. (born January 28, 1968), known by his stage name Rakim, is an American rapper. One half of golden age hip hop duo Eric B. & Rakim, he is widely regarded as one of the most influential and most skilled MCs of all time. Eric B. & Rakim's classic album Paid in Full was named the greatest hip hop album of all time by MTV in 2006, while Rakim himself was ranked #4 on MTV's list of the Greatest MCs of All Time."
// };
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
							'<a ng-if="isURI(object)" href="#/detail?uri={{object.value}}">{{object.label}}</a>' +
						'</li>' +
					'</ul>' +
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
				'<label ng-if="facts.id" class="group-header">{{facts.id}}</label>' +
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
                '<div class="resource-depiction">' +
                    '<img class="media-object img-thumbnail" dbpedia-depiction resource="resource">' +
                '</div>' +
                '<div class="resource-header">' +
                    '<a class="heading" href="{{ resource.wikipedia }}" target="_blank">' +
                        '{{ resource.label }}' +
                    '</a>' +
                    '<p class="comment">{{ resource.comment }}</p>' + 
                '</div>' +
                '<div class="grouped-facts-container">' +
                    '<div class="generic-facts">' +
                        '<label class="group-header">About</label>' +
                        '<p class="content">' +
                            '{{ resource.comment }}' +
                        '</p>' +
                    '</div>' +
                    '<dbpedia-grouped-facts facts="groupedFacts" ng-repeat="groupedFacts in resource.facts">' +
                    '</dbpedia-grouped-facts>' +
                '</div>',
            scope: {
                resource: '='       //two-way parent scope binding
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
			template: '<input type="text" placeholder="{{placeholder}}" class="form-control" style="height:45px;font-size: 1.3em;" />',
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