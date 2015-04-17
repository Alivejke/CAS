$(document).ready(function() {
	// if($("#datepicker").length) {
	// 	$( "#datepicker" ).datepicker({
	// 		inline: true,
	// 		firstDay: 1
	// 	});
	// 	var firstDay = $( ".selector" ).datepicker( "option", "firstDay" );
	// 	// Setter
	// 	$( ".selector" ).datepicker( "option", "firstDay", 1 );
	// }
	

	$('.btn_big_rounded').click(function() {
		$('.calendar_block').toggle();
	})

	if($("#datepicker").length) {
		$("#datepicker").daterangepicker();
	}

});;$(document).ready(function() {
	var $self = $(this),
		$selects = $('.js-example-basic-single'),
		$approverSelects = $('.js-approver_for_request'),
        $multipleSelect = $('.js-example-basic-multiple'),
		approverSelectsText = $approverSelects.data('text');

	$selects.select2({
        minimumResultsForSearch: -1,
        escapeMarkup: function  (markup) {
            return markup;
        }
    });

    $approverSelects.select2({
    	minimumResultsForSearch: -1,
        placeholder: approverSelectsText,
        escapeMarkup: function  (markup) {
            return markup;
        }
    });

    $multipleSelect.select2({
        minimumResultsForSearch: -1,
        escapeMarkup: function  (markup) {
            return markup;
        }
    });
});;$(document).ready(function() {
    var $self = $(this),
    	$navigationDropdown = $('.navigation_dropdown', $self),
    	$navigationDropdownBlock = $('.navigation_dropdown_block', $self),
    	speed = 500,
        speedFast = 200,
        animationBlock = false;

    $('input:radio, input:checkbox').checkedPolyfill();

    $navigationDropdownBlock.on('click', function(event){
    	event.stopPropagation();
    });

    $(document).scroll(function(){
        var body = $(document).scrollTop();
        if ( body > 78 ) {
            $('ul.menu').addClass('scroll');
            $('.menu_scroll_wrap').addClass('scrollWrap');
        } else {
            $('ul.menu').removeClass('scroll');
            $('.menu_scroll_wrap').removeClass('scrollWrap');
        }
    });

    $(function() {
        $( ".checkbox input:checkbox" ).on( "click", function() {
           if($(this).is(":checked")) {$(this).parent().addClass('chacked'); }
           else {$(this).parent().removeClass('chacked');}
        })
    });
    
    $( ".checkbox input:checkbox" ).each(function () {
        if($(this).is(":checked")) {$(this).parent().addClass('chacked'); }
        else {$(this).parent().removeClass('chacked');}
    });

    function closeMenu () {
        animationBlock = true;
        $navigationDropdown.removeClass('active');
        
        $navigationDropdown.find('.navigation_dropdown_block_wrap').animate({
            opacity: 0
        }, speed, function() {
            $navigationDropdown.find('.navigation_dropdown_block').animate({
                height: [0, 'easeInOutQuart']
            }, speedFast, function () {
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