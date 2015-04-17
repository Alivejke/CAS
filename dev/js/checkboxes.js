function initializeCheckboxes () {
	$('input:radio, input:checkbox').checkedPolyfill();
	
	$( ".checkbox input:checkbox" ).on( "click", function() {
       if($(this).is(":checked")) {$(this).parent().addClass('chacked'); }
       else {$(this).parent().removeClass('chacked');}
    });
    
    $( ".checkbox input:checkbox" ).each(function () {
        if($(this).is(":checked")) {$(this).parent().addClass('chacked'); }
        else {$(this).parent().removeClass('chacked');}
    });
}