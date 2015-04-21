;$(function() {
	if ( navigator.userAgent.toLowerCase().indexOf('msie') != -1) {
		$('.channel:nth-child(2n+1)').addClass('odd');

		$('.document:nth-child(2n+1)').addClass('odd');
	}

});