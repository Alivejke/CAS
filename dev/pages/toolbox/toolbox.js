$(document).ready(function() {

	var $icoStar = $('.ico_star'),
		$search = $('.js_search'),
		$activitiesSearch = $('.js-activities-search'),
		$searchBlockWrapper = $('.search_block_wrapper'),
		$searchBlock = $searchBlockWrapper.find('.js-tabs_content li.active'),
		$menuScrollWrap = $('.menu_scroll_wrap'),
		$btnSelect = $('.js-btn_select'),
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

	function animateSearchWrap (searchField, blockHeight) {
		searchField.animate({
		    height: blockHeight + baseIndentValue
		}, speed, function () {
			animationBlock = false;
		});
	}

	$icoStar.on ('click', function() {
		$(this).toggleClass('active');
	});

	$search.on('click', function() {
		var $this = $(this),
			$searchWrap = $this.closest('body').find('.js-form_search-wrap'),
			searchBlockHeight = $searchWrap.find('.search_block_wrap').outerHeight();

		// if( $('.js-tabs_content').outerHeight() == 0 ){
		// 	if(animationBlock) return;

		// 	$this.toggleClass('active');

		// 	$activitiesSearch.val('0').change();

		// 	$('body').animate({
		// 	      scrollTop: $searchBlockWrapper.offset().top + $searchBlockWrapper.outerHeight()
		// 	}, speedFast, function () {
		// 		animateSearchBlock();
		// 	});
		// } else {
		// 	$this.removeClass('active');
		// 	$('body').animate({
		// 	      scrollTop: $searchBlockWrapper.offset().top - headerFixedHeight	
		// 	}, speedFast);
		// }

		$this.toggleClass('active');
		$btnSelect.toggleClass('active');

		$('body').animate({
			scrollTop: $searchBlockWrapper.offset().top
		}, speedFast, function () {
			if( $this.hasClass('active') ) {
				animateSearchWrap ($searchWrap, searchBlockHeight);
			} else {
				animateSearchWrap ($searchWrap, -baseIndentValue);
			}
		});

	});

	$btnSelect.on('click', function(){
		var $this = $(this),
			$searchWrap = $this.closest('.search_block_wrapper').next('.content_wrap.bg_gray').find('.js-form_search-wrap'),
			searchBlockHeight = $searchWrap.find('.search_block_wrap').outerHeight();

		$this.toggleClass('active');
		$search.toggleClass('active');

		if( $this.hasClass('active') ) {
			animateSearchWrap ($searchWrap, searchBlockHeight);
		} else {
			animateSearchWrap ($searchWrap, -baseIndentValue);
		}
	});

});