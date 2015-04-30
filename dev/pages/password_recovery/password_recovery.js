;$(function() {
	var $mailField = $('.js-mail');

	function validationMail ($field) {

		if(! (/^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/.test($field.val()))){
			// alert("Ошибка в E-mail!");
			$field.focus();
			$field.addClass('error_validation').removeClass('complete');
			return false;
		} else {
			$field.removeClass('error_validation').addClass('complete');
		}
	};

	$mailField.on('change', function(){
		var $this = $(this);

		validationMail($this);
	});
});