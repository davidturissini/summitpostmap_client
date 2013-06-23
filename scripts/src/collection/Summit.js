define(
	[
		'backbone'
	],

	function (Backbone) {
		var SummitCollection;


		SummitCollection = Backbone.Collection.extend({
			url:'/summits'
		});


		return SummitCollection;


	}

	
)