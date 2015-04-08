$(document).ready(function() {
	$( "#datepicker" ).datepicker({
		inline: true,
		firstDay: 1
	});
	var firstDay = $( ".selector" ).datepicker( "option", "firstDay" );
	// Setter
	$( ".selector" ).datepicker( "option", "firstDay", 1 );
	
});