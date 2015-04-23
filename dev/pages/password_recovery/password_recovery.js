;$(function() {
	var $passwordField = $('.password_wrap input');

	function validationMail ($field) {

		if(! (/^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/.test($field.val()))){
			alert("Ошибка в E-mail!");
			$field.focus();
			$field.addClass('error').removeClass('complete');
			return false;
		} else {
			$field.removeClass('error').addClass('complete');
		}
	};

	$passwordField.on('change', function(){
		var $this = $(this);

		validationMail($this);
	});
});