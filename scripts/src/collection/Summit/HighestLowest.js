define(
	'src/collection/Summit/HighestLowest',

	[
		'backbone',
		'src/model/Summit'
	],

	function (Backbone, Summit) {
		var HighestLowestCollection = Backbone.Collection.extend({
			url:'/summits/highest_lowest',
			model:Summit,

			highest: function () {
				return this.at(0);
			},

			lowest: function () {
				return this.at(1);
			}

		});


		return HighestLowestCollection;


	}
)