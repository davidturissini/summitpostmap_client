define(
	'src/ui/Map',

	[
		'jQuery',
		'Q',
		'backbone',
		'src/model/Summit',
		'src/ui/SummitMarker',
		'google_maps'
	],

	function (jQuery, Q, Backbone, Summit, SummitMarker, google_maps) {
		var markers = {};
		var infoWindow = new google_maps.InfoWindow();
		

	

		var MapUI = Backbone.View.extend({

			initialize: function () {
				this.collection.bind('reset', function () {
					var marker;

					for(var x in markers) {
						if (markers.hasOwnProperty(x)) {
							marker = markers[x];
							if (marker && !this.collection.get(marker.model.id)) {
								marker.remove();
								markers[x] = undefined;
	 						}
						}
					}

					this.collection.each(this.showSummit.bind(this));
				}.bind(this))
			},


			refresh: function () {
	        	var mapBounds = this.googleMap.getBounds();
				var southWest = mapBounds.getSouthWest();
				var northEast = mapBounds.getNorthEast();
				var marker;

				var sw = {
					latitude:southWest.lat(),
					longitude:southWest.lng()
				}

				var ne = {
					latitude:northEast.lat(),
					longitude:northEast.lng()
				}

				


				this.collection.addFilter({
					bounds: {
						sw:sw,
						ne:ne
					}
				});


				return this.collection.fetch();

	        
	    	},


	    	showSummit: function (summit) {
	    		var markerKey = summit.id;
		        var marker = markers[markerKey];
		        
		        

		        if (marker === undefined) {
		        	marker = markers[markerKey] = new SummitMarker({
		        		model:summit, 
		        		googleMap:this.googleMap,
		        		infoWindow:infoWindow
		        	});

		        	marker.render();
		        }

		        
	    	},

			render: function (mapOptions) {
				var deferred = Q.defer();
				this.googleMap = new google_maps.Map(this.el, mapOptions);

				google_maps.event.addListener(this.googleMap, 'idle', function () {
					this.refresh()

					.then(function () {
						deferred.resolve();
					})
				}.bind(this));


				return deferred.promise;
			}

		});


		return MapUI;

		
	}
)