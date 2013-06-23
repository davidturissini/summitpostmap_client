define(
	[
		'jQuery',
		'backbone',
		'mustache',
		'src/model/Summit',
		'src/collection/Summit',
		'google_maps'
	], 

	function (jQuery, Backbone, Mustache, Summit, SummitCollection, google_maps) {
		var mapEl;
		var markers = {};
		var infoWindow = new google_maps.InfoWindow();
		var collection = new SummitCollection();

		var infoWindowTemplate = '<div class="infowindow-summit"><a target="_blank" href="{{url}}"><img src="{{image}}" /><h1>{{title}}</h1></a></div>';

		function buildMap(mapOptions) {
			var map = new google_maps.Map(mapEl, mapOptions);

			function showSummit (summit) {
        		var markerKey = summit.get('latitude') + "" + summit.get('longitude');
		        var marker = markers[markerKey];
		        var latLng = new google_maps.LatLng(summit.get('latitude'), summit.get('longitude'));
		        

		        if (marker === undefined) {
		        	marker = markers[markerKey] = new google_maps.Marker();
		        	marker.setPosition(latLng);
		        	
		        }

		        if (marker.getMap() !== map) {
		        	marker.setMap(map);
		        }

		        google_maps.event.addListener(marker, 'click', function() {
		        	infoWindow.setContent(Mustache.render(infoWindowTemplate, summit.attributes));
		        	infoWindow.setPosition(latLng);

		        	if (infoWindow.getMap() !== map) {
				    	infoWindow.setMap(map);
				    }
				});

	        }


	        function refreshMap () {
	        	var mapBounds = map.getBounds();
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

				for(var x in markers) {
					if (markers.hasOwnProperty(x)) {
						marker = markers[x];
						if (marker && !mapBounds.contains(marker.getPosition())) {
							marker.setMap(null);
							markers[x] = undefined;
 						}
					}
				}

				var request = collection.fetch({
					data: {
						bounds: {
							sw:sw,
							ne:ne
						}
					}
				})

				.then(function () {
					collection.each(showSummit);
			        
				});
	        	

	        }


	       	
			google_maps.event.addListener(map, 'idle', refreshMap);
		}

		jQuery(document).ready(function () {
			var mapOptions = {
				center: new google_maps.LatLng("46.83885", "-121.72224"),
				zoom: 8,
				mapTypeId: google_maps.MapTypeId.TERRAIN
	        };

			mapEl = document.getElementById('map');

			navigator.geolocation.getCurrentPosition(function (geo) {
				mapOptions.center = new google_maps.LatLng(geo.coords.latitude, geo.coords.longitude);
				buildMap(mapOptions);

			}, function () {
				buildMap(mapOptions);
			});
		});


	}
);