$(document).ready(function() {
	if($("#datepicker").length) {
		$( "#datepicker" ).datepicker({
			inline: true,
			firstDay: 1
		});
		var firstDay = $( ".selector" ).datepicker( "option", "firstDay" );
		// Setter
		$( ".selector" ).datepicker( "option", "firstDay", 1 );
	}
	

	$('.btn_big_rounded').click(function() {
		$('.calendar_block').toggle();
	})
	// $("a.ui-state-default").text(23).addClass('ui-state-active2');
});