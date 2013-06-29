define(
	'src/collection/Summit',
	
	[
		'jQuery',
		'backbone',
		'src/model/Summit'
	],

	function (jQuery, Backbone, Summit) {
		var SummitCollection;


		SummitCollection = Backbone.Collection.extend({
			url:'/summits',
			model:Summit,

			initialize: function () {
				this.filter = {};
			},

			addFilter: function (filterObj) {
				jQuery.extend(this.filter, filterObj || {});
			},


			fetch: function () {
				var data = this.filter;
				
				return Backbone.Collection.prototype.fetch.call(this, {
					data:data
				});
			}

		});


		return SummitCollection;


	}

	
)