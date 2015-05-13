;$(function() {
	var $self = $(this)
		$tabsNav = $('.tabs_nav', $self),
		$tabsNavItems = $tabsNav.find('li'),
		$tabsContentWrap = $('.tabs_content'),
		idx = 0,
		idxFix = 0; 

	// $tabsContentWrap.find('> li:first').addClass('active');

	$tabsNavItems.each(function (index, element) {
        if( $(this).parent().hasClass('js-tabs_nav_fix') ){
        	$(this).attr("data-page", idxFix);
        	idxFix++;
        } else {
        	$(this).attr("data-page", idx);
        	idx++;
        }
	});

	$tabsNavItems.on('click', function(event){
		event.preventDefault();
		
		var $this = $(this),
			$tabsContentWrap = $('.tabs_content');

		idx = $this.data('page');
		$this.addClass('active').siblings().removeClass('active');
		$tabsContentWrap.find('> li').eq(idx).addClass('active').siblings().removeClass('active');

		if( $this.parent().hasClass('js-tabs_nav_fix') ) {
			$this.closest('.tabs_content_wrap').prev('.header').find('.tabs_nav li').each( function(){
				if( $(this).data('page') == $this.data('page') ) {
					$(this).addClass('active');
				} else {
					$(this).removeClass('active');
				}
			});
		} else {
			$this.closest('.header').next('.tabs_content_wrap').find('.tabs_nav li').each( function () {
				if( $(this).data('page') == $this.data('page') ) {
					$(this).addClass('active');
				} else {
					$(this).removeClass('active');
				}
			})
		}

	});
});