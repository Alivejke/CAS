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

	
	$("#datepicker").daterangepicker();

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
        speedFast = 200;

    $('input:radio, input:checkbox').checkedPolyfill();

    $navigationDropdown.on('click', function(){
    	var $this = $(this);

    	if( $this.hasClass('active') ){
    		$this.removeClass('active');
    		$this.find('.navigation_dropdown_block').animate({
	    		height: [0, 'easeInOutQuart']
	    	}, speed, function() {
                $this.find('.navigation_dropdown_block > .navigation_dropdown_block_wrap').animate({
		    	    opacity: 0
                }, speedFast);
		    });
    	} else {
    		$this.addClass('active');
    		$this.find('.navigation_dropdown_block').animate({
	    		height: ['396px', 'easeInOutQuart']
	    	}, speed, function(){
	    		$this.find('.navigation_dropdown_block > .navigation_dropdown_block_wrap').animate({
	    			opacity: 1
	    		}, speedFast);
	    	});
    	}

    });

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

    $('.ico_star').click(function () {
        $(this).toggleClass('active');
    })

    // $('.ico_basket').click(function() {
    //     $(this).parent().parent('.block').remove();
    // })
});