$(function() {
	if(jQuery('#parallax').length != 0){
		if(jQuery(window).width() > 980){
			jQuery('#parallax .parallax-layer').parallax(
				{mouseport: jQuery('#parallax')}
				);

			$(window).load(function(){
				jQuery('#parallax .parallax-layer').css('display','block');		
			});
		}
	}
});  