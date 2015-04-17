;$(function() {
	var $uploadButtons = $('.js-uploader'),
		$basketButtons = $('.js-basket'),
		urlCheck = '';
		// block = '<div class="block"><div class="icon"><div class="sprite sprite_ico ico_search"></div><img src="' + urlCheck + '" alt=""></div><div class="name">Marlboro_mechanics_2014.pdf<span class="file_size"> (48)mb</span><a class="sprite sprite_ico ico_basket js-basket"></a></div><div class="checkbox"><label class="checkbox"><span class="label_ico"></span><input type="checkbox" checked>Download available</label></div><textarea name="" id="" placeholder="Add description"></textarea></div>';

	/* http://valums-file-uploader.github.io/file-uploader/ */
	$uploadButtons.each(function () {
	    var $this = $(this),
	        buttonDefaultText = $this.text(),
	        urlCheck = '/img/parlament_bg.jpg',
	        sizeCheck = '123',
	        nameCheck = 'Tititi';

	    var uploader = new qq.FileUploader({
	        element: this,
	        action: '/server/upload',
	        allowedExtensions: ['jpg', 'jpeg', 'png', 'gif'],
	        onSubmit: function () {
	            $this.text('Uploading...');
	        },
	        onComplete: function (url, name, size) {
	            $this.text(buttonDefaultText);

	        	if( $this.parent().hasClass('block_img') ){
	        		$this.hide();
	        		$this.closest('.block_img').append('<img src="' + urlCheck + '" alt="">');   
	        	} else {
		            var template = _.template($("#template").html());
		            // $this.closest('form').find('.attachments_block_wrap').append(template({url: url, size: size, name: name}));
		            $this.closest('form').find('.attachments_block_wrap').append(template({url: urlCheck, size: sizeCheck, name: nameCheck}));
	        		
	        	}

	        }
	    }); 
	});

	$('.block_img').on('click', 'img', function (event){
		event.preventDefault();
		
		$(this).closest('.block_img').find('.js-uploader').trigger('click');
	});

	$('body').on('click', '.js-basket', function (event) {
		event.preventDefault();

		$(this).closest('.block').remove();
	});

	$(document).mouseup(function (event) {
	    var container = $('.calendar_block');
	    
	    if ( container.has(event.target).length === 0 && $('.datepicker_bottom_block').has(event.target).length === 0 && $('.comiseo-daterangepicker').has(event.target).length === 0 ){
	        container.hide();
	    }
	});




});