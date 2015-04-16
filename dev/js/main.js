$(document).ready(function() {
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

});