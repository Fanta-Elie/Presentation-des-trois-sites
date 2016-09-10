$(function() {
	var Photo	= (function() { 
		var $list = $('#boite-image'),
		$elems = $list.find('img'),
		settings = {
			maxScale	: 1.4,
			maxOpacity	: 0.9,
			minOpacity	: Number( $elems.css('opacity') )
		},
		init = function() {
			settings.minScale = valeur_echelle() || 1;
			_initEvents();
		}, 
		valeur_echelle = function() {
			var st = window.getComputedStyle($elems.get(0), null),
			tr = st.getPropertyValue("-webkit-transform") ||
			st.getPropertyValue("-moz-transform") ||
			st.getPropertyValue("-ms-transform") ||
			st.getPropertyValue("-o-transform") ||
			st.getPropertyValue("transform") ||
			"fail...";
			if( tr !== 'none' ) {	  
				var values = tr.split('(')[1].split(')')[0].split(','),
				a = values[0],
				b = values[1],
				c = values[2],
				d = values[3];
				return Math.sqrt( a * a + b * b );
			}
		},
		_initEvents	= function() {
			$elems.on('proximity.Photo', { 
				max: 80, throttle: 10, fireOutOfBounds : true }, function( event, proximity, distance ) 
				{
					var $el	= $(this),
					$li	= $el.closest('li'),
					scaleVal = proximity * ( settings.maxScale - settings.minScale ) + settings.minScale,
					scaleExp = 'scale(' + scaleVal + ')';
					( scaleVal === settings.maxScale ) ? $li.css( 'z-index', 1000 ) : $li.css( 'z-index', 1 );
					$el.css({
						'-webkit-transform'	: scaleExp,
						'-moz-transform'	: scaleExp,
						'-o-transform'		: scaleExp,
						'-ms-transform'		: scaleExp,
						'transform'			: scaleExp,
						'opacity'			: ( proximity * ( settings.maxOpacity - settings.minOpacity ) + settings.minOpacity )
					});

				});
		}
		return {
			init : init
		};
	})();
	Photo.init();
});