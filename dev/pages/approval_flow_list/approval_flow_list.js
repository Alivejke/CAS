;$(function() {
	var $self = $(this)
		$tabsNav = $('.tabs_nav', $self),
		$tabsNavItems = $tabsNav.find('li'),
		$tabsContentWrap = $('.tabs_content'),
		idx = 0;

	$tabsContentWrap.find('> li:first').addClass('active');

	$tabsNavItems.each(function (index, element) {
		$(this).attr("data-page", idx);
        idx++; 
	});

	$tabsNavItems.on('click', function(event){
		event.preventDefault();
		
		var $this = $(this);

		idx = $this.data('page');
		$this.addClass('active').siblings().removeClass('active');
		$tabsContentWrap.find('> li').eq(idx).addClass('active').siblings().removeClass('active');

	});
});