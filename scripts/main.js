define(
	'main',

	[
		'google_maps',
		'src/ui/Map',
		'src/collection/Summit',
		'src/collection/Summit/HighestLowest',
		'src/ui/ElevationSlider'
	], 

	function (google_maps, UIMap, SummitCollection, HighestLowest, UIElevationSlider) {
		var collection = new SummitCollection();

		jQuery(document).ready(function () {
			var map = new UIMap({
				collection:collection,
				el:document.getElementById('map')
			});


			var mapOptions = {
				center: new google_maps.LatLng("46.83885", "-121.72224"),
				zoom: 8,
				mapTypeId: google_maps.MapTypeId.TERRAIN
	        };


	        var timeout = window.setTimeout(function () {
				jQuery('body').addClass('busy');
			}, 1000);
			

			function renderMap (mapOptions) {
				return map.render(mapOptions)

					.then(function () {
						
						clearTimeout(timeout);
						jQuery('body').removeClass('busy');
				        
					})

					.then(function () {
						var highestLowest = new HighestLowest();

						highestLowest.fetch()

						.then(function () {
							var highest = highestLowest.highest();
							var lowest = highestLowest.lowest();
							var slider = new UIElevationSlider({
								el:document.getElementById('elevation-slider'),
								min:lowest.get('elevation'),
								max:highest.get('elevation'),
								collection:collection
							});


							slider.render();


							


						});
					})
			}



			navigator.geolocation.getCurrentPosition(function (geo) {
				mapOptions.center = new google_maps.LatLng(geo.coords.latitude, geo.coords.longitude);
				renderMap(mapOptions);

			}, function () {
				renderMap(mapOptions);
			}, {
				timeout:1000
			});


			jQuery('#drawer-handle').click(function () {
				jQuery(document.body).toggleClass('drawer-open');
			})


		});


	}
);