'use strict';

describe("resource_view_directive_test", function(){
	var elm, scope, displayConfiguration;

	beforeEach(module('gulp-ng'));
	beforeEach(inject(function($rootScope, $compile, _displayConfiguration_, _$httpBackend_) {
		elm = jQuery(
			'<div>' +
				'<dbpedia-resource-view resource="facts">' +
				'</dbpedia-resource-view>' +
			'</div>'
		);

		scope = $rootScope.$new();
		scope.facts = {
			"uri": "http://dbpedia.org/resource/Sample",
			"lang": "en",
			"label": "A Sample Label",
			"alt-label": "",
			"depiction": "http://upload.wikimedia.org/wikipedia/commons/1/13/Tupac_Shakur_(rapper),_performing_live.jpg",
			"type": "http://xmlns.com/foaf/0.1/Person",
			"abstract": "A Sample Abstract",
			"facts": [
				{
					"predicate": {
						"type": "uri",
						"value": "http://purl.org/dc/elements/1.1/description"
					},
					"predicate_label": {
						"type": "literal",
						"xml:lang": "en",
						"value": "Description"
					},
					"objects": [
						{
							"type": "literal",
							"xml:lang": "en",
							"value": "American rap artist, actor and poet"
						}
					]
				},
				{
					"type": "group",
					"id": "bio",
					"facts": [
						{
							"predicate": {
								"type": "uri",
								"value": "http://dbpedia.org/ontology/birthDate"
							},
							"predicate_label": {
								"type": "literal",
								"xml:lang": "en",
								"value": "Birth date"
							},
							"objects": [
								{
									"type": "typed-literal",
									"datatype": "http://www.w3.org/2001/XMLSchema#date",
									"value": "1971-06-15+02:00"
								}
							]
						},
						{
							"predicate": {
								"type": "uri",
								"value": "http://dbpedia.org/ontology/birthPlace"
							},
							"predicate_label": {
								"type": "literal",
								"xml:lang": "en",
								"value": "Birth place"
							},
							"objects": [
								{
									"type": "uri",
									"value": "http://dbpedia.org/resource/New_York_City",
									"object_label": {
										"type": "literal",
										"xml:lang": "en",
										"value": "New York City"
									}
								}
							]
						},
						{
							"predicate": {
								"type": "uri",
								"value": "http://dbpedia.org/ontology/deathDate"
							},
							"predicate_label": {
								"type": "literal",
								"xml:lang": "en",
								"value": "Death date"
							},
							"objects": [
								{
									"type": "typed-literal",
									"datatype": "http://www.w3.org/2001/XMLSchema#date",
									"value": "1996-09-12+02:00"
								}
							]
						},
						{
							"predicate": {
								"type": "uri",
								"value": "http://dbpedia.org/ontology/deathPlace"
							},
							"predicate_label": {
								"type": "literal",
								"xml:lang": "en",
								"value": "Death place"
							},
							"objects": [
								{
									"type": "uri",
									"value": "http://dbpedia.org/resource/Las_Vegas",
									"object_label": {
										"type": "literal",
										"xml:lang": "en",
										"value": "Las Vegas"
									}
								}
							]
						}
					]
				},
				{
					"predicate": {
						"type": "uri",
						"value": "http://dbpedia.org/ontology/occupation"
					},
					"predicate_label": {
						"type": "literal",
						"xml:lang": "en",
						"value": "Occupation"
					},
					"objects": [
						{
							"type": "uri",
							"value": "http://dbpedia.org/resource/Rapping",
							"object_label": {
								"type": "literal",
								"xml:lang": "en",
								"value": "Rapping"
							}
						},
						{
							"type": "uri",
							"value": "http://dbpedia.org/resource/Actor",
							"object_label": {
								"type": "literal",
								"xml:lang": "en",
								"value": "Actor"
							}
						}
					]
				}
			]
		};

		$compile(elm)(scope);
		scope.$digest();
	}));
	
	xit('should create a wrapper div when there are facts for the resource', function () {
		scope.facts = {
			"head": {
				"vars": [ "p" , "predicate_label" , "o" , "object_label" , "rank" ]
			},
			"results": {
				"bindings": [
					{
						"p": { "type": "uri" , "value": "http://www.w3.org/2000/01/rdf-schema#label" },
						"predicate_label": { "type": "literal" , "value": "label" },
						"o": { "type": "literal" , "xml:lang": "en" , "value": "A Sample Label" }
					}
				]
			}
		};
		scope.$apply();

		var wrapper = elm.find('div.wrapper');
		expect(wrapper.length).toBe(1);
	});

	xit('should display nothing when there are no facts for the resource', function () {
		var wrapper = elm.children('div');
		//expect(wrapper.length).toBe(0);
		expect(elm.is(':empty')).toBe(true);
	});

	it('should display the label from the resource facts', function() {
		var heading = elm.find('label.heading');
		expect(heading.length).toBe(1);
		expect(heading.html()).toBe('A Sample Label');
	});

	it('should display the abstract from the resource facts', function() {
		var heading = elm.find('p.abstract');
		expect(heading.length).toBe(1);
		expect(heading.html()).toBe('A Sample Abstract');
	});


	it('should display each of the grouped facts', function() {
		//make sure a list item is created for each dbpedia-grouped-fact
		var listItems = elm.children('dbpedia-resource-view').children('ul').children('li');
		expect(listItems.length).toBe(3, 'Incorrect amount of list items');

		var typedResourceViews = elm.find('dbpedia-grouped-facts');
		expect(typedResourceViews.length).toBe(3, 'Incorrect amount of dbpedia-grouped-facts elements');
	});

	it('should pass the grouped facts to dbpedia-resource-view via the fact attribute', function() {
		var typedResourceViews = elm.find('dbpedia-grouped-facts[facts="groupedFacts"]');
		expect(typedResourceViews.length).toBe(3, 'Grouped facts not passed via the fact attribute');
	});
});