;$(function() {
	if ( navigator.userAgent.toLowerCase().indexOf('msie') != -1) {
		$('.channel:nth-child(2n+1)').addClass('odd');

		$('.document:nth-child(2n+1)').addClass('odd');
	}

	$(document).on('click', function (event) {
	    var $container = $('.status_wrap');
	    // debugger
	    if ( $container.has(event.target).length === 0 && $('.datepicker_bottom_block').has(event.target).length === 0 && $('.comiseo-daterangepicker').has(event.target).length === 0 ){
	        $container.find('.calendar_block').hide();
	    }
	});
	
});