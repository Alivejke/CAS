$(document).ready(function() {
    var $self = $(this),
    	$navigationDropdown = $('.navigation_dropdown', $self),
    	$navigationDropdownBlock = $('.navigation_dropdown_block', $self),
    	speed = 300;

    $('input:radio, input:checkbox').checkedPolyfill();

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
});