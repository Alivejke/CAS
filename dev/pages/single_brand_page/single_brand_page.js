$(document).ready(function() {
	var $self = $(this)
		$tabsNav = $('.js-tabs_nav', $self),
		$tabsNavItems = $tabsNav.find('option'),
		$tabsContentWrap = $('.js-tabs_content'),
		$searchBlockWrapper = $('.search_block_wrapper'),
		$searchBlock = $searchBlockWrapper.find('.search_block_wrap'),
		speed = 700,
		speedFast = 100,
		animationBlock = false;
		idx = 0;
	// $tabsContentWrap.find('> li:first').addClass('active');

	$tabsNavItems.each(function (index, element) {
		$(this).attr("data-page", idx);
        idx++; 
	});

	// $tabsNav.on('change', function(event){
	// 	event.preventDefault();
		
	// 	var $this = $(this);

	// 	idx = $this.val();
	// 	// $this.addClass('active').siblings().removeClass('active');
	// 	$tabsContentWrap.find('> li').eq(idx).addClass('active').siblings().removeClass('active');

	// 	$tabsContentWrap.find('> li.active').find('.search_block_wrap').animate({
	// 	    height: "toggle"
	// 	}, speed, function () {
	// 		$tabsContentWrap.find('> li.active').find('.search_block_wrap').animate({
	// 			"z-index": "1",
	// 			"height": "auto"
	// 		}, speed);
	// 		animationBlock = false;
	// 	});

	// });

	// $searchBlock.animate({
	//     height: "toggle"
	// }, speed, function () {
	// 	animationBlock = false;
	// });

	$tabsNav.on('change', function(event){
		event.preventDefault();

		var $this = $(this),
			idx = $this.val(),
			$activeForm = $tabsContentWrap.find('> li').eq(idx),
			activeFormHeight = $activeForm.outerHeight(),
			baseIndentValue = 20;

		// $this.addClass('active').siblings().removeClass('active');
		// $activeForm.addClass('active').siblings().removeClass('active');

		$activeForm.animate({
		    "height": 0
		}, speedFast, function () {
			$activeForm.addClass('active').siblings().removeClass('active');
			$tabsContentWrap.animate({
				"z-index": 1,
				"height": activeFormHeight + baseIndentValue
			}, speed);

			$activeForm.animate({
			    "height": activeFormHeight + baseIndentValue
			}, speed);

			animationBlock = false;
		});

	});

	$('.ico_star').click(function() {
		$(this).toggleClass('active');
	});

});