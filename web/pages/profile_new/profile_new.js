;$(function() {
	var $passwordField = $('.password_wrap input');

	function validationPass ($field) {
		if( $field.val() == '' ){
			alert('пароль не указан');
			$field.focus();
			$field.addClass('error');
			return false;
		}

		if( $field.val().length < 4 ){
			alert(' должно быть не менее 4-х символов!');
			$field.focus();
			$field.addClass('error');
			return false;
		};

		if(! (/^[a-zA-Z0-9]+$/.test( $field.val() )) ){
			alert('пароль должен состоять из комбинации латинских букв и арабских цифр!');
			$field.focus();
			$field.addClass('error');
			return false;
		};
	}

	function confirmPass ($field, $fieldConfirm) {
		if( $field.val() == '' || $fieldConfirm.val() == '' ){
			$fieldConfirm.focus();
			return false;
		} else if( $field.val() !== $fieldConfirm.val() ){
			$field.addClass('error');
			$field.removeClass('complete');
			$fieldConfirm.addClass('error');
			$fieldConfirm.removeClass('complete');
		} else {
			$field.removeClass('error');
			$field.addClass('complete');
			$fieldConfirm.removeClass('error');
			$fieldConfirm.addClass('complete');
		}
	}

	$passwordField.on('change', function(){
		var $this = $(this),
			$secondInput = $this.parent().siblings('div').find('input');

		validationPass($this);
		confirmPass ($this, $secondInput);
	});
	

});