$(document).ready(function() {

	var $icoStar = $('.ico_star'),
		$search = $('.js_search'),
		$activitiesSearch = $('.js-activities-search'),
		$searchBlockWrapper = $('.search_block_wrapper'),
		$searchBlock = $searchBlockWrapper.find('.js-tabs_content li.active'),
		$menuScrollWrap = $('.menu_scroll_wrap'),
		searchBlockHeight = $searchBlock.outerHeight(),
		speed = 500,
		speedFast = 300,
		animationBlock = false,
		baseIndentValue = 20,
		headerFixedHeight = 45;

	function animateSearchBlock () {
		$searchBlock.animate({
		    height: searchBlockHeight
		}, speed, function () {
			$searchBlockWrapper.find('.js-tabs_content').animate({
				height: searchBlockHeight + baseIndentValue
			});
			animationBlock = false;
		});
	}

	$icoStar.on ('click', function() {
		$(this).toggleClass('active');
	});

	$search.on('click', function() {
		var $this = $(this);

		if( $('.js-tabs_content').outerHeight() == 0 ){
			if(animationBlock) return;

			$this.toggleClass('active');
			$('body').animate({
			      scrollTop: $searchBlockWrapper.offset().top + $searchBlockWrapper.outerHeight()
			}, speedFast, function () {
				animateSearchBlock();
			});
		} else {
			$this.removeClass('active');
			$('body').animate({
			      scrollTop: $searchBlockWrapper.offset().top - headerFixedHeight	
			}, speedFast);
		}

	});

	$activitiesSearch.on('change', function() {
		var $this = $(this);

		// animateSearchBlock();
		// $search.toggleClass('active');
	});

});