$(document).ready(function() {
	var calendarPaddingWidth = 19;
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
		$('.calendar_block').show();
	});

	function calendarPositions () {
		$('.comiseo-daterangepicker').css({
			top: $('.status_wrap').offset().top + $('.status_wrap').height(),
			left: $('.status_wrap').offset().left + calendarPaddingWidth,
			width: $('.status_wrap').width() - calendarPaddingWidth*2
		});

		$('.datepicker_bottom_block').css({
			top: $('.status_wrap').height() + $('.comiseo-daterangepicker').height(),
			left: 1
		});
	}

	if($("#datepicker").length) {
		
		$("#datepicker").daterangepicker({
			datepickerOptions : {
		        numberOfMonths : 1,
		        firstDay: 1,
				maxDate: null
		    }
		});

		$(".ico_calendar_big").on('click', function () {
			$("#datepicker").daterangepicker("open");

			calendarPositions ();
		});
	}

	$(window).resize(function(){
		calendarPositions ();
	});


});
