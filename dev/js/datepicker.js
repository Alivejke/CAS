$(document).ready(function() {
	var calendarPaddingWidth = 19;

	function calendarPositions () {
		// debugger
		$('.comiseo-daterangepicker').css({
			top: $('.calendarWrap').offset().top + $('.calendarWrap').height(),
			left: $('.calendarWrap').offset().left + calendarPaddingWidth,
			width: $('.calendarWrap').width() - calendarPaddingWidth*2
		});

		$('.datepicker_bottom_block').css({
			top: $('.status_wrap').outerHeight() + $('.comiseo-daterangepicker').outerHeight(),
			left: calendarPaddingWidth
		});

		$('.calendar_block').show();
	}

	if($("#datepicker").length) {

		$("#datepicker").daterangepicker({
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

			    	$('.calendar_from').val( startDate );
			    	$('.calendar_to').val( endDate );
		    	}, 0);
		    }
		});

		$(".calendarWrap").on('click', function () {
			$("#datepicker").daterangepicker("open");

			calendarPositions ();
		});

		$(window).resize(function(){
			calendarPositions ();
		});

	    $(document).scroll(function(){
	        var body = $(document).scrollTop();
	        if ( body > 10 ) {
	            calendarPositions ();
	        }
	    });

	    $('.js-reset').on('click', function(){
	    	$("#datepicker").daterangepicker("clearRange");
	    	$('.calendar_from').val('');
	    	$('.calendar_to').val('');
	    });
		
	}


});
