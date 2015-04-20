console.log('asd');
$(document).ready(function() {
	
	$('body').on('click', '.js-basket', function (event) {

		event.preventDefault();

		$(this).closest('.block').remove();
	});
	// $('.')
})