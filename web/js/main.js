function initializeCheckboxes () {
	$('input:radio, input:checkbox').checkedPolyfill();
	
  $( "body" ).on( 'click', '.checkbox input:checkbox', function() {
     if($(this).is(':checked')) {$(this).parent().addClass('chacked'); }
     else {$(this).parent().removeClass('chacked');}
  });
  
  $( ".checkbox input:checkbox" ).each(function () {
      if($(this).is(":checked")) {$(this).parent().addClass('chacked'); }
      else {$(this).parent().removeClass('chacked');}
  });
};$(document).ready(function() {
	var calendarPaddingWidth = 19;

	function calendarPositions ($dateWrap) {
		// debugger
		$('.comiseo-daterangepicker').css({
			'top': $dateWrap.offset().top + $dateWrap.height(),
			'left': $dateWrap.offset().left + calendarPaddingWidth,
			'width': $dateWrap.width() - calendarPaddingWidth*2,
			'min-width': $dateWrap.width() - calendarPaddingWidth*2
		});

		$('.datepicker_bottom_block').css({
			'top': $dateWrap.outerHeight() + $('.comiseo-daterangepicker').outerHeight(),
			'left': calendarPaddingWidth
		});

		$dateWrap.find('.calendar_block').show();
	};

	if($(".datepicker").length) {

		$(".datepicker").daterangepicker({
			datepickerOptions : {
		        numberOfMonths : 1,
		        firstDay: 1,
				maxDate: null
		    },
		    onChange: function(instance) {
		    	setTimeout(function() {
			    	var $start = instance.dpDiv.find('.ui-state-highlight-start'),
			    		$end = instance.dpDiv.find('.ui-state-highlight-end'),
			    		startDay = ("0" +  $start.find('a').text()).slice(-2),
			    		startMonth =("0" +  $start.data('month')).slice(-2),
			    		startYear = $start.data('year'),
			    		endDay = ("0" +  $end.find('a').text()).slice(-2),
			    		endMonth = ("0" +  $end.data('month')).slice(-2),
			    		endYear = $end.data('year'),
			    		startDate = startDay && startMonth && startYear ? startDay + '.' + startMonth + '.' + startYear : '',
			    		endDate = endDay && endMonth && endYear ? endDay + '.' + endMonth + '.' + endYear : '';

			    	$('.calendarWrap.active').find('.calendar_from').val( startDate );
			    	$('.calendarWrap.active').find('.calendar_to').val( endDate );
		    	}, 0);
		    }
		});

		$(".calendarWrap").on('click', function () {
			var $this = $(this),
				$datepicker = $this.find('.datepicker');

			$this.addClass('active');

			$datepicker.daterangepicker("open");

			calendarPositions ($this);
		});

		$(window).resize(function(){
			var $calendarWrap = $('.calendarWrap');

			calendarPositions ($calendarWrap);
		});

	    $(document).scroll(function(){
	        var $calendarWrap = $('.calendarWrap'),
	        	body = $(document).scrollTop();

	        if ( body > 10 ) {
	            calendarPositions ($calendarWrap);
	        }
	    });

	    $('.js-reset').on('click', function(){
	    	$('.calendarWrap.active').find('.datepicker').daterangepicker("clearRange");
	    	$('.calendarWrap.active').find('.calendar_from').val('');
	    	$('.calendarWrap.active').find('.calendar_to').val('');
	    });
		
	}


});
;$(document).ready(function() {
	var $self = $(this),
		$selects = $('.js-example-basic-single'),
		$approverSelects = $('.js-approver_for_request'),
        $multipleSelect = $('.js-example-basic-multiple'),
		approverSelectsText = $approverSelects.data('text');

	$selects.select2({
        minimumResultsForSearch: -1,
        escapeMarkup: function  (markup) {
            return markup;
        }
    });

    $approverSelects.select2({
    	minimumResultsForSearch: -1,
        placeholder: approverSelectsText,
        escapeMarkup: function  (markup) {
            return markup;
        }
    });

    $multipleSelect.select2({
        minimumResultsForSearch: -1,
        escapeMarkup: function  (markup) {
            return markup;
        }
    });
});;$(document).ready(function() {
    var $self = $(this),
    	$navigationDropdown = $('.navigation_dropdown', $self),
    	$navigationDropdownBlock = $('.navigation_dropdown_block', $self),
    	speed = 500,
        speedFast = 200,
        animationBlock = false;

    

    $navigationDropdownBlock.on('click', function(event){
    	event.stopPropagation();
    });

    $(document).scroll(function(){
        var body = $(document).scrollTop();
        if ( body > 78 ) {
            $('ul.menu').addClass('scroll');
            $('.menu_scroll_wrap').addClass('scrollWrap');
        } else {
            $('ul.menu').removeClass('scroll');
            $('.menu_scroll_wrap').removeClass('scrollWrap');
        }
    });


    initializeCheckboxes();

    function closeMenu () {
        animationBlock = true;
        
        $navigationDropdown.find('.navigation_dropdown_block_wrap').animate({
            opacity: 0
        }, speed, function() {
            $navigationDropdown.find('.navigation_dropdown_block').animate({
                height: [0, 'easeInOutQuart']
            }, speedFast, function () {
                $navigationDropdown.removeClass('active');
                animationBlock = false;
            });
        });
    }

    function openMenu (argument) {
        animationBlock = true;
        $navigationDropdown.addClass('active');
        
        $navigationDropdown.find('.navigation_dropdown_block').animate({
            height: ['396px', 'easeInOutQuart']
        }, speed, function(){
            $navigationDropdown.find('.navigation_dropdown_block_wrap').animate({
                opacity: 1
            }, speedFast, function () {
                animationBlock = false;
            });
        });
    }

    $('body').on('click', '.navigation_dropdown', function (event) {
        if(animationBlock) return;

        var $target = $(event.currentTarget);

        if($target.hasClass('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    $('body').on('click', function (event) {
        if(animationBlock) return;

        var $target = $(event.currentTarget);
        
        if( $navigationDropdown.hasClass('active') && ($target.hasClass('navigation_dropdown_block') || $navigationDropdownBlock.has($target)) ) {
            closeMenu();
        }
    });

});;;$(function () {
    var $accessManagementBlock = $('.access-management-block'),
        $accessManagementItems = $accessManagementBlock.find('.access-management-item'),
        accessManagementPopupHtml = $('#popup-acces-managment-tpl').html(),
        accessManagementItemHtml = $('#popup-acces-item-tpl').html(),
        $popupWrap = $('#popup_block'),
        $accessPopup;

    function closePopup () {
        $accessPopup.off('click');
        $accessPopup.remove();
        $popupWrap.removeClass('popup_active');
    }

    function openPopup (data) {
        var tpl = _.template(accessManagementPopupHtml);

        $accessPopup = $( tpl({ data: data ? data : {activity: {}, toolbox: {}, brand: {}, accessManagement: {}, adGroups: []} }) );

        var $form = $accessPopup.find('form');

        if(data && data.id) {
            $form.find('[name="adGroups"]').children().each(function () {
                var $this = $(this);
                
                if( _.where(data.adGroups, $this.val()).length ) {
                    $this.attr('selected', 'selected');
                }
            });
        }

        $accessPopup.on('click', '.btn-save', function (event) {
            event.preventDefault();

            var sendData = {
                id: data ? data.id : null,
                name: $form.find('[name="name"]').val(),
                activity: {
                    view: $form.find('[name="activityView"]').is(':checked'),
                    change: $form.find('[name="activityChange"]').is(':checked'),
                    approve: $form.find('[name="activityApprove"]').is(':checked')
                },
                toolbox: {
                    view: $form.find('[name="toolboxView"]').is(':checked'),
                    change: $form.find('[name="toolboxChange"]').is(':checked'),
                    approve: $form.find('[name="toolboxApprove"]').is(':checked')
                },
                brand: {
                    view: $form.find('[name="brandView"]').is(':checked'),
                    change: $form.find('[name="brandChange"]').is(':checked'),
                    approve: $form.find('[name="brandApprove"]').is(':checked')
                },
                accessManagement: {
                    view: $form.find('[name="accessManagementView"]').is(':checked'),
                    change: $form.find('[name="accessManagementChange"]').is(':checked'),
                    approve: $form.find('[name="accessManagementApprove"]').is(':checked')
                },
                adGroups: $form.find('[name="adGroups"]').val()

            };

            $.ajax({
                url: $form.attr('action'),
                type: 'GET',
                dataType: 'json',
                data: sendData,
                success: function (responce) {
                    closePopup();

                    if(data && data.id) {
                        var idx = _.findIndex(accessManagementData, function(item) {
                                return item.id == data.id;
                            }),
                            $changedItem = $accessManagementItems.filter('[data-id="' + data.id + '"]');

                        $.extend(accessManagementData[idx], sendData);
                        accessManagementData[idx].adGroups = sendData.adGroups;

                        $changedItem.find('.access-management-name').text(data.name);
                        $changedItem.find('.access-management-activity-view').text(data.activity.view ? 'Yes' : 'No');
                        $changedItem.find('.access-management-activity-change').text(data.activity.change ? 'Yes' : 'No');
                        $changedItem.find('.access-management-activity-approve').text(data.activity.approve ? 'Yes' : 'No');
                        $changedItem.find('.access-management-ad-groups').html(data.adGroups ? data.adGroups.join(', <br>') : '');
                        $changedItem.find('.access-management-toolbox-view').text(data.toolbox.view ? 'Yes' : 'No');
                        $changedItem.find('.access-management-toolbox-change').text(data.toolbox.change ? 'Yes' : 'No');
                        $changedItem.find('.access-management-toolbox-approve').text(data.toolbox.approve ? 'Yes' : 'No');
                        $changedItem.find('.access-management-brand-view').text(data.brand.view ? 'Yes' : 'No');
                        $changedItem.find('.access-management-brand-change').text(data.brand.change ? 'Yes' : 'No');
                        $changedItem.find('.access-management-brand-approve').text(data.brand.approve ? 'Yes' : 'No');
                        $changedItem.find('.access-management-access-management-view').text(data.accessManagement.view ? 'Yes' : 'No');
                        $changedItem.find('.access-management-access-management-change').text(data.accessManagement.change ? 'Yes' : 'No');
                        $changedItem.find('.access-management-access-management-approve').text(data.accessManagement.approve ? 'Yes' : 'No');
                    } else {

                        if(!sendData.id) sendData.id = Math.random() + "";

                        var itemTpl = _.template(accessManagementItemHtml),
                            $item = itemTpl({ data: responce.data ? responce.data : sendData, isOdd: $accessManagementItems.length % 2 == 0 });

                        $accessManagementBlock.append( $item );
                        $accessManagementItems = $accessManagementBlock.find('.access-management-item');

                        accessManagementData.push(responce.data ? responce.data : sendData);
                    }
                },
                error: function (argument) {
                    alert('Something went wrong');
                }
            });
        });

        $accessPopup.on('click', '.btn-cansel', function (event) {
            event.preventDefault();

            closePopup();
        });

        $popupWrap.addClass('popup_active').append($accessPopup);

        $('.js-example-basic-multiple').select2({
            minimumResultsForSearch: -1,
            escapeMarkup: function  (markup) {
                return markup;
            }
        });

        initializeCheckboxes();
    }

    $accessManagementBlock.on('click', '.btn_delete', function (event) {
        event.preventDefault();

        var $item = $(event.currentTarget).closest('.access-management-item'),
            id = $item.data('id');

        $.ajax({
            url: '/request.json',
            type: 'GET',
            dataType: 'json',
            data: {
                id: id
            },
            success: function () {
                var idx = _.findIndex(accessManagementData, function(item) {
                    return item.id == id;
                });

                accessManagementData.splice(idx, 1);

                $item.remove();
                $accessManagementItems = $accessManagementBlock.find('.access-management-item');
            },
            error: function () {
                alert('Something went wrong');
            }
        });
    });


    $accessManagementBlock.on('click', '.btn_edit', function (event) {
        event.preventDefault();

        var id = $(event.currentTarget).closest('.access-management-item').data('id') + "",
            data = _.where(accessManagementData, {id: id})[0];

        openPopup(data);
    });


    $('.btn-add-role').on('click', function (event) {
        event.preventDefault();

        openPopup();
    });

    $popupWrap.on('click', '#popup_fone', function () {
        closePopup();
    });
});;$(function() {

	$(document).on('click', function (event) {
	    var $container = $('.status_wrap');
	    // debugger
	    if ( $container.has(event.target).length === 0 && $('.datepicker_bottom_block').has(event.target).length === 0 && $('.comiseo-daterangepicker').has(event.target).length === 0 ){
	        $container.find('.calendar_block').hide();
	    }
	});




});;;$(function() {
	if ( navigator.userAgent.toLowerCase().indexOf('msie') != -1) {
		$('.channel:nth-child(2n+1)').addClass('odd');

		$('.document:nth-child(2n+1)').addClass('odd');
	}

	$(document).on('click', function (event) {
	    var $container = $('.status_wrap');
	    // debugger
	    if ( $container.has(event.target).length === 0 && $('.datepicker_bottom_block').has(event.target).length === 0 && $('.comiseo-daterangepicker').has(event.target).length === 0 ){
	        $container.removeClass('active').find('.calendar_block').hide();
	    }
	});
	
});;;$(function() {
	if ( navigator.userAgent.toLowerCase().indexOf('msie') != -1) {
		$('.wrap_table > div:nth-child(odd)').addClass('odd');
	}
});;;$(function() {
	var $mailField = $('.js-mail');

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

	$mailField.on('change', function(){
		var $this = $(this);

		validationMail($this);
	});
});;;$(function() {
	var $uploadButtons = $('.js-uploader');


	/* http://valums-file-uploader.github.io/file-uploader/ */
	$uploadButtons.each(function () {
	    var $this = $(this),
	        buttonDefaultText = $this.text();

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
	        }
	    });
	    
	});
});;;$(function() {

	var $popupWrap = $('#popup_block'),
		emailNotifHtml = $('#edit-notification-tpl').html(),
		emailNotifItemHtml = $('#email-notification-item-tpl').html(),
		$emailNotifPopup,
		$emailNotificationItemsWrap = $('.email-notification-block'),
		$emailNotificationItems = $emailNotificationItemsWrap.find('.email-notification-item');

	function closeEmailNotifPopup () {
		$emailNotifPopup.off('click');
		$emailNotifPopup.remove();
		$popupWrap.removeClass('popup_active');
	}

	function openEmailNotifPopup (data) {
		var tpl = _.template(emailNotifHtml);

		$emailNotifPopup = $( tpl({ data: data ? data : {} }) );

		var $form = $emailNotifPopup.find('form');

		$emailNotifPopup.on('click', '.btn-save', function (event) {
			event.preventDefault();

			var sendData = {
				id: data ? data.id : null,
				subject: $form.find('[name="subject"]').val(),
				text: $form.find('[name="text"]').val()
			};

			$.ajax({
				url: $form.attr('action'),
				type: 'GET',
				dataType: 'json',
				data: sendData,
				success: function (responce) {
					closeEmailNotifPopup();

					if(data && data.id) {
						var idx = _.findIndex(emailNotificationsData, function(item) {
								return item.id == data.id;
							}),
							$changedItem = $emailNotificationItems.filter('[data-id="' + data.id + '"]');

						$.extend(emailNotificationsData[idx], sendData);
						$changedItem.find('.email-notification-label').text(data.label);
						$changedItem.find('.email-notification-subject').text(data.subject);
						$changedItem.find('.email-notification-text').text(data.text);
					} else {

						if(!sendData.id) sendData.id = Math.random() + "";

						var itemTpl = _.template(emailNotifItemHtml),
							$item = itemTpl({ data: responce.data ? responce.data : sendData, isOdd: $emailNotificationItems.length % 2 == 0 });

						$emailNotificationItemsWrap.append( $item );
						$emailNotificationItems = $emailNotificationItemsWrap.find('.email-notification-item');

						emailNotificationsData.push(responce.data ? responce.data : sendData);
					}
				},
				error: function (argument) {
					alert('Something went wrong');
				}
			});
		});

		$popupWrap.addClass('popup_active').append($emailNotifPopup);
	}

	if ( navigator.userAgent.toLowerCase().indexOf('msie') != -1) {
		$('.wrap_table > div:nth-child(odd)').addClass('odd');
	}

	$('.btn-add-notification').on('click', function (event) {
		event.preventDefault();

		openEmailNotifPopup();
	});

	$emailNotificationItemsWrap.on('click', '.btn-edit', function (event) {
		event.preventDefault();
		
		var id = $(event.currentTarget).closest('.email-notification-item').data('id') + "",
			data = _.where(emailNotificationsData, {id: id})[0];

		openEmailNotifPopup(data);
	});

	$popupWrap.on('click', '#popup_fone', function () {
		closeEmailNotifPopup();
	});

});;;$(function() {

	if ( navigator.userAgent.toLowerCase().indexOf('msie') != -1) {
		$('.wrap_table > div:nth-child(odd)').addClass('odd');
	}
	
});;;$(function() {
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

	$(document).on('click', function (event) {
	    var $container = $('.status_wrap');
	    // debugger
	    if ( $container.has(event.target).length === 0 && $('.datepicker_bottom_block').has(event.target).length === 0 && $('.comiseo-daterangepicker').has(event.target).length === 0 ){
	        $container.find('.calendar_block').hide();
	    }
	});




});;;$(function() {
	var $mailField = $('.js-mail');

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

	$mailField.on('change', function(){
		var $this = $(this);

		validationMail($this);
	});
});;;$(function() {
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
	

});;$(document).ready(function() {

	$('.ico_star').click(function() {
		$(this).toggleClass('active');
	});

});;$(document).ready(function() {

	$('.ico_star').click(function() {
		$(this).toggleClass('active');
	});

});;;$(function() {
	var $uploadButtons = $('.js-uploader'),
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
	            $this.hide();
	            $this.closest('.js-img_wrap').append('<img src="' + urlCheck + '" alt="">');           
	        }
	    });

	    // $this.find('.qq-upload-button')[0].innerText = buttonDefaultText;
	    // console.log($this.find('.qq-upload-button')[0])
	});

	$imgWrap.on('click', 'img', function (event){
		event.preventDefault();
		
		$(this).closest('.js-img_wrap').find('.js-uploader').trigger('click');
	});
});;console.log('asd');
$(document).ready(function() {
	
	$('body').on('click', '.js-basket', function (event) {

		event.preventDefault();

		$(this).closest('.block').remove();
	});
	// $('.')
});$(document).ready(function() {

	$('.ico_star').click(function() {
		$(this).toggleClass('active');
	});

});