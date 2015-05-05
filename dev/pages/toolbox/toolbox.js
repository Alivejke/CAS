$(document).ready(function() {

	var $icoStar = $('.ico_star'),
		$search = $('.js_search'),
		speed = 1000,
		speedFast = 500,
		animationBlock = false;

	$icoStar.on ('click', function() {
		$(this).toggleClass('active');
	});

	$search.on('click', function() {
		var $this = $(this),
			$searchBlockWrapper = $('.search_block_wrapper'),
			$searchBlock = $searchBlockWrapper.find('.search_block_wrap');

		if(animationBlock) return;

		$this.toggleClass('active');

		$('body').animate({
		      scrollTop: $searchBlockWrapper.offset().top
		}, speedFast, function () {
			$searchBlock.animate({
			    height: "toggle"
			}, speed, function () {
				animationBlock = false;
			});
		});

		
	});

});