define(
	'src/ui/SummitMarker',

	[
		'backbone',
		'google_maps',
		'mustache'
	],

	function (Backbone, google_maps, Mustache) {
		var SummitMarker;
		var infoWindowTemplate = '<div class="infowindow-summit"><a target="_blank" href="{{url}}"><img src="{{image}}" /><h1>{{title}}</h1></a></div>';


		SummitMarker = Backbone.View.extend({

			remove: function () {
				if (this._marker) {
					this._marker.setMap(null);
				}
			},

			render: function () {
				var summit = this.model;
				var infoWindow = this.options.infoWindow;
				var latLng = new google_maps.LatLng(summit.get('latitude'), summit.get('longitude'));
				this._marker = new google_maps.Marker();
		        this._marker.setPosition(latLng);

		        this._marker.setMap(this.options.googleMap);

		        google_maps.event.addListener(this._marker, 'click', function() {
		        	infoWindow.setContent(Mustache.render(infoWindowTemplate, summit.attributes));
		        	infoWindow.setPosition(latLng);

		        	if (infoWindow.getMap() !== this.options.googleMap) {
				    	infoWindow.setMap(this.options.googleMap);
				    }
				}.bind(this));
			}

		});


		return SummitMarker;
	}
)