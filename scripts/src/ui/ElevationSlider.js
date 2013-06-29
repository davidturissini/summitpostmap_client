define(
	'src/ui/ElevationSlider',

	[
		'jQuery',
		'backbone'
	],

	function (jQuery, Backbone) {
		var ElevationSlider = Backbone.View.extend({

			__populateLabels: function (lowElevationMeters, highElevationMeters) {
				var higherElevationEl = jQuery('#higher-elevation');
				var lowerElevationEl = jQuery('#lower-elevation');
				var highElevationFeet = highElevationMeters * 3.28084;
				var lowElevationFeet = lowElevationMeters * 3.28084;

				higherElevationEl.text(Math.round(highElevationFeet) + 'ft / ' + highElevationMeters + 'm');
				lowerElevationEl.text(Math.round(lowElevationFeet) + 'ft / ' + lowElevationMeters + 'm');

			},

			render: function () {

				var slideTimeout;
				
				

				jQuery('.slider', this.el).slider({
					min:this.options.min,
					max:this.options.max,
					range: true,
					values: [ this.options.min, this.options.max ],
					slide: function( event, ui ) {
						
						var highElevationMeters = ui.values[0];
						var lowElevationMeters = ui.values[1];
						this.__populateLabels(lowElevationMeters, highElevationMeters);

						clearTimeout(slideTimeout);

						slideTimeout = window.setTimeout(function () {


							this.collection.addFilter({
								elevation: {
									min:ui.values[0],
									max:ui.values[1]
								}
							});

							this.collection.fetch();


						}.bind(this), 500)
						

					}.bind(this)
				});

				var notches = jQuery('.ui-slider-handle', this.el);


				notches.html('<span id="lower-elevation" class="label"></span>');
				notches.first().html('<span id="higher-elevation" class="label"></span>');
				
				
				
				this.__populateLabels(this.options.max, this.options.min);
	
			}

		});

		return ElevationSlider;
	}
)