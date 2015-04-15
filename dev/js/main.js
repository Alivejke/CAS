$(document).ready(function() {
    var $self = $(this),
    	$navigationDropdown = $('.navigation_dropdown', $self),
    	$navigationDropdownBlock = $('.navigation_dropdown_block', $self),
    	speed = 300;

    $navigationDropdown.on('click', function(){
    	var $this = $(this);

    	if( $(this).hasClass('active') ){
    		$(this).removeClass('active');
    		$(this).find('.navigation_dropdown_block').animate({
	    		height: 0
	    	}, speed, function() {
		    	opacity: 0
		    });
    	} else {
    		$(this).addClass('active');
    		$(this).find('.navigation_dropdown_block').animate({
	    		height: '396px'
	    	}, speed, function(){
	    		$this.find('.navigation_dropdown_block').animate({
	    			opacity: 1
	    		});
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
        } else {
            $('ul.menu').removeClass('scroll');
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