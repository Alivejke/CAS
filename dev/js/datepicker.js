;$(function () {
	var calendarPaddingWidth = 19;

	function calendarPositions ($dateWrap) {

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
				maxDate: null,
			    onSelect: function(dateText, instance, range) {
			    	var startDate = '',
			    		endDate = '';

			    	if(range.start) {
				    	var startDay = ("0" +  range.start.getDate()).slice(-2),
				    		startMonth =("0" +  (range.start.getMonth() + 1)).slice(-2),
				    		startYear = range.start.getFullYear();

				    	startDate = startDay + '.' + startMonth + '.' + startYear;
			    	}
// debugger
			    	if(range.end) {
				    	var endDay = ("0" +  range.end.getDate()).slice(-2),
				    		endMonth = ("0" +  (range.end.getMonth() + 1)).slice(-2),
				    		endYear = range.end.getFullYear();

			    		endDate = endDay + '.' + endMonth + '.' + endYear;
			    	}

			    	$('.calendarWrap.active').find('.calendar_from').val( startDate );
			    	$('.calendarWrap.active').find('.calendar_to').val( endDate );

			    	checkFieldsGlobal.checkFields( $('.calendarWrap.active').find('.calendar_from') );
			    	checkFieldsGlobal.checkFields( $('.calendarWrap.active').find('.calendar_to') );
			    }
		    }
		});

		$(".calendarWrap").on('click', function (event) {
			event.preventDefault();

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

	        if(  $('.calendarWrap.active').length ){
				$calendarWrap = $('.calendarWrap.active');
	        } else {
				$calendarWrap = $('.calendarWrap');
	        }

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