;$(function() {
	var $uploadButtons = $('.js-uploader'),
		$basketButtons = $('.js-basket');

	/* http://valums-file-uploader.github.io/file-uploader/ */
	$uploadButtons.each(function () {
	    var $this = $(this),
	        buttonDefaultText = $this.text();

	    var uploader = new qq.FileUploader({
	        element: this,
	        action: '/server/upload',
	        allowedExtensions: ['jpg', 'jpeg', 'png', 'gif'],
	        onSubmit: function () {
	            $this.text('Uploading...');
	        },
	        onComplete: function () {
	            $this.text(buttonDefaultText);                
	        }
	    }); 
	});

	$basketButtons.on('click', function (event) {
		event.preventDefault();

		$(this).closest('.block').remove();
	});

	$(document).mouseup(function (event) {
	    var container = $('.calendar_block');
	    if ( container.has(event.target).length === 0 ){
	        container.hide();
	    }
	});
});