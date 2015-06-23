$(document).ready(function() {
    var $self = $(this),
    	$navigationDropdown = $('.navigation_dropdown', $self),
    	$navigationDropdownBlock = $('.navigation_dropdown_block', $self),
        $menu = $('.breadcrumbs ul'),
        $menuScrollWrap = $('.menu_scroll_wrap'),
        $header = $('.header'),
        $headerImg = $('.element_header'),
        $tabsNavFix = $('.navigation_dropdown_list_fixed'),
    	speed = 500,
        speedFast = 200,
        animationBlock = false;

    function addScroll () {
        $menu.addClass('scroll');
        $menuScrollWrap.addClass('scrollWrap');
        $tabsNavFix.addClass('navigation_dropdown_list_fixed_scroll');
    };

    function removeScroll () {
        $menu.removeClass('scroll');
        $menuScrollWrap.removeClass('scrollWrap');
        $tabsNavFix.removeClass('navigation_dropdown_list_fixed_scroll');
    };

    $navigationDropdownBlock.on('click', function(event){
    	event.stopPropagation();
    });

    $(document).scroll(function(){
        var body = $(document).scrollTop();
        if( $('body').hasClass('bigIndentScroll') ) {
            if( body > $header.outerHeight() + $headerImg.outerHeight() ) {
                addScroll();
            } else {
                removeScroll();
            }
        } else {
            if ( body > 78 ) {
                addScroll();
            } else {
                removeScroll();
            }
        }
    });


    initializeCheckboxes();

    function closeMenu () {
        animationBlock = true;
        
        $navigationDropdown.find('.navigation_dropdown_block_wrap').animate({
            opacity: 0
        }, speed, function() {
            $navigationDropdown.find('.navigation_dropdown_block').animate({
                height: [0, 'easeInOutQuart']
            }, speedFast, function () {
                $navigationDropdown.removeClass('active');
                animationBlock = false;
            });
        });
    }

    function openMenu (argument) {
        animationBlock = true;
        $navigationDropdown.addClass('active');
        
        $navigationDropdown.find('.navigation_dropdown_block').animate({
            height: ['396px', 'easeInOutQuart']
        }, speed, function(){
            $navigationDropdown.find('.navigation_dropdown_block_wrap').animate({
                opacity: 1
            }, speedFast, function () {
                animationBlock = false;
            });
        });
    }

    $('body').on('click', '.navigation_dropdown', function (event) {
        if(animationBlock) return;

        var $target = $(event.currentTarget);

        if($target.hasClass('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    $('body').on('click', function (event) {
        if(animationBlock) return;

        var $target = $(event.currentTarget);
        
        if( $navigationDropdown.hasClass('active') && ($target.hasClass('navigation_dropdown_block') || $navigationDropdownBlock.has($target)) ) {
            closeMenu();
        }
    });

});