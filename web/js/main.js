function initializeCheckboxes () {
	$('input:radio, input:checkbox').checkedPolyfill();
	
  $( "body" ).on( 'click', '.checkbox input:checkbox', function() {
     if($(this).is(':checked')) {$(this).parent().addClass('chacked'); }
     else {$(this).parent().removeClass('chacked');}
  });
  
  $( ".checkbox input:checkbox" ).each(function () {
      if($(this).is(":checked")) {$(this).parent().addClass('chacked'); }
      else {$(this).parent().removeClass('chacked');}
  });
};$(document).ready(function() {
	var calendarPaddingWidth = 19;

	function calendarPositions ($dateWrap) {
		// debugger
		$('.comiseo-daterangepicker').css({
			'top': $dateWrap.offset().top + $dateWrap.height(),
			'left': $dateWrap.offset().left + calendarPaddingWidth,
			'width': $dateWrap.width() - calendarPaddingWidth*2,
			'min-width': $dateWrap.width() - calendarPaddingWidth*2
		});

		$('.datepicker_bottom_block').css({
			'top': $dateWrap.outerHeight() + $('.comiseo-daterangepicker').outerHeight(),
			'left': calendarPaddingWidth
		});

		$dateWrap.find('.calendar_block').show();
	};

	if($(".datepicker").length) {

		$(".datepicker").daterangepicker({
			datepickerOptions : {
		        numberOfMonths : 1,
		        firstDay: 1,
				maxDate: null
		    },
		    onChange: function(instance) {
		    	setTimeout(function() {
			    	var $start = instance.dpDiv.find('.ui-state-highlight-start'),
			    		$end = instance.dpDiv.find('.ui-state-highlight-end'),
			    		startDay = ("0" +  $start.find('a').text()).slice(-2),
			    		startMonth =("0" +  $start.data('month')).slice(-2),
			    		startYear = $start.data('year'),
			    		endDay = ("0" +  $end.find('a').text()).slice(-2),
			    		endMonth = ("0" +  $end.data('month')).slice(-2),
			    		endYear = $end.data('year'),
			    		startDate = startDay && startMonth && startYear ? startDay + '.' + startMonth + '.' + startYear : '',
			    		endDate = endDay && endMonth && endYear ? endDay + '.' + endMonth + '.' + endYear : '';

			    	$('.calendarWrap.active').find('.calendar_from').val( startDate );
			    	$('.calendarWrap.active').find('.calendar_to').val( endDate );
		    	}, 0);
		    }
		});

		$(".calendarWrap").on('click', function () {
			var $this = $(this),
				$datepicker = $this.find('.datepicker');

			$this.addClass('active');

			$datepicker.daterangepicker("open");

			calendarPositions ($this);
		});

		$(window).resize(function(){
			var $calendarWrap = $('.calendarWrap');

			calendarPositions ($calendarWrap);
		});

	    $(document).scroll(function(){
	        var $calendarWrap = $('.calendarWrap'),
	        	body = $(document).scrollTop();

	        if ( body > 10 ) {
	            calendarPositions ($calendarWrap);
	        }
	    });

	    $('.js-reset').on('click', function(){
	    	$('.calendarWrap.active').find('.datepicker').daterangepicker("clearRange");
	    	$('.calendarWrap.active').find('.calendar_from').val('');
	    	$('.calendarWrap.active').find('.calendar_to').val('');
	    });
		
	}


});
;$(document).ready(function() {
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