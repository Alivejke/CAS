;$(function() {
	var $uploadButtons = $('.js-uploader'),
		$basketButtons = $('.js-basket');

	/* http://valums-file-uploader.github.io/file-uploader/ */
	$uploadButtons.each(function () {
	    var $this = $(this),
	        buttonDefaultText = $this.text(),
	        urlCheck = '/img/parlament_bg.jpg';

	    var uploader = new qq.FileUploader({
	        element: this,
	        action: '/server/upload',
	        allowedExtensions: ['jpg', 'jpeg', 'png', 'gif'],
	        onSubmit: function () {
	            $this.text('Uploading...');
	        },
	        onComplete: function (url) {
	            $this.text(buttonDefaultText);
	            $this.hide();
	            $this.closest('.block_img').append('<img src="' + urlCheck + '" alt="">');
	        }
	    }); 
	});

	$('.block_img').on('click', 'img', function (event){
		event.preventDefault();
		
		$(this).closest('.block_img').find('.js-uploader').trigger('click');
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