define(
	'src/model/Summit',

	[
		'backbone'
	],

	function (Backbone) {
		var Summit;


		Summit = Backbone.Model.extend({
			idAttribute:'_id'
		});


		return Summit;
	}
)