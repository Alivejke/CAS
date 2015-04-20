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
}