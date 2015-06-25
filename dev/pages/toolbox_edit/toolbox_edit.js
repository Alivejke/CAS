;$(function() {
	var $uploadButtons = $('.js-uploader-image'),
		$imgWrap = $('.js-img_wrap');


	/* http://valums-file-uploader.github.io/file-uploader/ */
	$uploadButtons.each(function () {
	    var $this = $(this),
	        buttonDefaultText = $this.text(),
	        urlCheck = '/img/parlament_bg.jpg';

	    var uploader = new qq.FileUploader({
	        element: this,
	        action: '/server/upload',
	        uploadButtonText: buttonDefaultText,
	        allowedExtensions: ['jpg', 'jpeg', 'png', 'gif'],
	        onSubmit: function () {
	            $this.text('Uploading...');
	        },
	        onComplete: function () {
	            $this.text(buttonDefaultText);
	            // $this.hide();
	            if( $this.closest('.js-img_wrap').find('.elem_logo_big').length ){
	            	$this.closest('.js-img_wrap').find('.elem_logo_big').hide();
	            }
	            $this.closest('.js-img_wrap').append('<img src="' + urlCheck + '" alt="">');           
	        }
	    });

	});

	$imgWrap.on('click', 'img', function (event){
		event.preventDefault();
		
		$(this).closest('.js-img_wrap').find('.js-uploader').trigger('click');
	});
});