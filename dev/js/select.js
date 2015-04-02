$(document).ready(function() {
	var $self = $(this),
		$selects = $('.js-example-basic-single'),
		$approverSelects = $('.js-approver_for_request'),
		approverSelectsText = $approverSelects.data('text');

	$selects.select2({
        minimumResultsForSearch: -1
    });

    $approverSelects.select2({
    	minimumResultsForSearch: -1,
        placeholder: approverSelectsText
    });
});