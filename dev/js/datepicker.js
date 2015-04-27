$(document).ready(function() {
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
