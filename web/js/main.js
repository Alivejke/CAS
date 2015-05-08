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
};;$(function () {
	var calendarPaddingWidth = 19;

	function calendarPositions ($dateWrap) {

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
				maxDate: null,
			    onSelect: function(dateText, instance, range) {
			    	var startDate = '',
			    		endDate = '';

			    	if(range.start) {
				    	var startDay = ("0" +  range.start.getDate()).slice(-2),
				    		startMonth =("0" +  (range.start.getMonth() + 1)).slice(-2),
				    		startYear = range.start.getFullYear();

				    	startDate = startDay + '.' + startMonth + '.' + startYear;
			    	}
// debugger
			    	if(range.end) {
				    	var endDay = ("0" +  range.end.getDate()).slice(-2),
				    		endMonth = ("0" +  (range.end.getMonth() + 1)).slice(-2),
				    		endYear = range.end.getFullYear();

			    		endDate = endDay + '.' + endMonth + '.' + endYear;
			    	}

			    	$('.calendarWrap.active').find('.calendar_from').val( startDate );
			    	$('.calendarWrap.active').find('.calendar_to').val( endDate );

			    	checkFieldsGlobal.checkFields( $('.calendarWrap.active').find('.calendar_from') );
			    	checkFieldsGlobal.checkFields( $('.calendarWrap.active').find('.calendar_to') );
			    }
		    }
		});

		$(".calendarWrap").on('click', function (event) {
			event.preventDefault();

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

	        if(  $('.calendarWrap.active').length ){
				$calendarWrap = $('.calendarWrap.active');
	        } else {
				$calendarWrap = $('.calendarWrap');
	        }

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

});;$(document).ready(function() {
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

});;function checkFieldsGlobal () {

    // checkFieldsGlobal.checkFields($this);

    // function isValidDate(date) {
    //     var matches = /^(\d{2})[.\/](\d{2})[.\/](\d{4})$/.exec(date);
    //     if (matches == null) return false;
    //     var d = matches[2];
    //     var m = matches[1] - 1;
    //     var y = matches[3];
    //     var composedDate = new Date(y, m, d);
    //     return composedDate.getDate() == d &&
    //             composedDate.getMonth() == m &&
    //             composedDate.getFullYear() == y;
    // }

    function isValidDate(date) {
        var val_r = date.split(".");
        var curDate = new Date(val_r[2], val_r[1], val_r[0]);
        return (
            curDate.getFullYear() == val_r[2]
            && curDate.getMonth() == val_r[1]
            && curDate.getDate() == val_r[0]
        );
    }

    function checkFields ($this) {
        if( $this.hasClass('requiredFieldsDate') ) {
            var date = $this.val();
debugger
            if( this.isValidDate( date ) === false ) {
                $this.closest('.btn_big_rounded').addClass('error_validation');
            } else {
                $this.closest('.btn_big_rounded').removeClass('error_validation');
            }

        } else if( $this.hasClass('requiredFieldsSelect') ) {
            if( $this.find('select').val() > 0 ) {
                $this.removeClass('error_validation');
            } else {
                $this.addClass('error_validation');
            }
        } else if( $this.hasClass('requiredFieldsTitle') ) {
            if( $this.text().length < 4 ){
                $this.addClass('error_validation');
            } else {
                $this.removeClass('error_validation');
            }
        } else if( $this.hasClass('requiredFieldsImage') ){
            if( !$this.find('img').length ) {
                $this.addClass('error_validation');
            } else {
                $this.removeClass('error_validation');
            }
        } else if( $this.hasClass('requiredFieldsCheckBox') ) {
            if( !$this.find('input[type="checkbox"]').is(':checked') ){
                $this.addClass('error_validation');
            } else {
                $this.removeClass('error_validation');
            }
        } else {
            if( $this.val().length < 4 ){
                // alert(' должно быть не менее 4-х символов!');
                $this.addClass('error_validation');
            } else{
                $this.removeClass('error_validation');
            }
        }
    };

    return {
        checkFields: checkFields,
        isValidDate: isValidDate
    };
}


var checkFieldsGlobal = checkFieldsGlobal();

;$(function () {
    var $accessManagementBlock = $('.access-management-block'),
        $accessManagementItems = $accessManagementBlock.find('.access-management-item'),
        accessManagementPopupHtml = $('#popup-acces-managment-tpl').html(),
        accessManagementItemHtml = $('#popup-acces-item-tpl').html(),
        $popupWrap = $('#popup_block'),
        $requiredFields = $('.requiredFields'),
        $accessPopup;

    function closePopup () {
        $accessPopup.off('click');
        $accessPopup.remove();
        $popupWrap.removeClass('popup_active');
    }

    function validationFields () {
        $('.requiredFields').each(function () {
            checkFieldsGlobal.checkFields( $(this) );
        });
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
                    if( !$('.error_validation').length ) {
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
                    }

                },
                error: function (argument) {
                    alert('Something went wrong');
                }
            });

            validationFields();
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

    $('.requiredFields').on('change', function() {
        checkFieldsGlobal.checkFields( $(this) );
    });

    // $('.requiredFieldsTitle').each( function () {
    //     $(this).addEventListener('input', function() {
    //         console.log( $(this) )
    //     }, false);
    // });

    $('body').on('change', '[contenteditable]', function() {
        var $this = $(this);
        // checkFieldsGlobal.checkFields( $this );

        $this.data('before', $this.html());
        return $this;


    }).on('blur keyup paste input', '[contenteditable]', function() {
        var $this = $(this);

        if ($this.data('before') !== $this.html()) {
            $this.data('before', $this.html());
            $this.trigger('change');
        }
        return $this;
    });

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

    $('body').on('keyup', '.requiredFields', function () {
        if( !$(this).hasClass('requiredFieldsTitle') ){
            if( $(this).val().length < 4 ) {
                $(this).addClass('error_validation');
            } else {
                $(this).removeClass('error_validation');
            }
        }
    });

    $('form').on('submit', function(event) {
        validationFields();

        if( $('.error_validation').length ) {
            event.preventDefault();
        }
    });
});
;$(function() {

	$(document).on('click', function (event) {
	    var $container = $('.status_wrap');
	    // debugger
	    // if ( $container.has(event.target).length === 0 && $('.datepicker_bottom_block').has(event.target).length === 0 && $('.comiseo-daterangepicker').has(event.target).length === 0 ){
	    //     $container.find('.calendar_block').hide();
	    // }
	});




});;;$(function() {
	if ( navigator.userAgent.toLowerCase().indexOf('msie') != -1) {
		$('.channel:nth-child(2n+1)').addClass('odd');

		$('.document:nth-child(2n+1)').addClass('odd');
	}

	// $(document).on('click', function (event) {
	//     var $container = $('.status_wrap');
	    
	//     if ( $container.has(event.target).length === 0 && $('.datepicker_bottom_block').has(event.target).length === 0 && $('.comiseo-daterangepicker').has(event.target).length === 0 ){
	       
	//         $container.removeClass('active').find('.calendar_block').hide();
	//     }
	// });
	
});;;$(function() {
	var $self = $(this)
		$tabsNav = $('.tabs_nav', $self),
		$tabsNavItems = $tabsNav.find('li'),
		$tabsContentWrap = $('.tabs_content'),
		idx = 0;

	$tabsContentWrap.find('> li:first').addClass('active');

	$tabsNavItems.each(function (index, element) {
		$(this).attr("data-page", idx);
        idx++; 
	});

	$tabsNavItems.on('click', function(event){
		event.preventDefault();
		
		var $this = $(this);

		idx = $this.data('page');
		$this.addClass('active').siblings().removeClass('active');
		$tabsContentWrap.find('> li').eq(idx).addClass('active').siblings().removeClass('active');

	});
});;;$(function() {
// 	if ( navigator.userAgent.toLowerCase().indexOf('msie') != -1) {
// 		$('.wrap_table > div:nth-child(odd)').addClass('odd');
// 	}
});;;$(function() {
// 	var $mailField = $('.js-mail');

// 	function validationMail ($field) {

// 		if(! (/^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/.test($field.val()))){
// 			alert("Ошибка в E-mail!");
// 			$field.focus();
// 			$field.addClass('error').removeClass('complete');
// 			return false;
// 		} else {
// 			$field.removeClass('error').addClass('complete');
// 		}
// 	};

// 	$mailField.on('change', function(){
// 		var $this = $(this);

// 		validationMail($this);
// 	});
});;;$(function() {
// 	var $uploadButtons = $('.js-uploader-image');


// 	/* http://valums-file-uploader.github.io/file-uploader/ */
// 	$uploadButtons.each(function () {
// 	    var $this = $(this),
// 	        buttonDefaultText = $this.text();

// 	    var uploader = new qq.FileUploader({
// 	        element: this,
// 	        action: '/server/upload',
// 	        uploadButtonText: buttonDefaultText,
// 	        allowedExtensions: ['jpg', 'jpeg', 'png', 'gif'],
// 	        onSubmit: function () {
// 	            $this.text('Uploading...');
// 	        },
// 	        onComplete: function () {
// 	            $this.text(buttonDefaultText);                
// 	        }
// 	    });
	    
// 	});
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

	function closePopup () {
        $accessPopup.off('click');
        $accessPopup.remove();
        $popupWrap.removeClass('popup_active');
    }

    function validationFields () {
        $('.requiredFields').each(function () {
            if( $(this).val().length < 4 ){
                // alert(' должно быть не менее 4-х символов!');
                $(this).addClass('error_validation');
            } else{
                $(this).removeClass('error_validation');
            }
        });
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
					if( !$('.error_validation').length ) {
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
                    }
				},
				error: function (argument) {
					alert('Something went wrong');
				}
			});

			validationFields();
		});

		$popupWrap.addClass('popup_active').append($emailNotifPopup);
	}

	// if ( navigator.userAgent.toLowerCase().indexOf('msie') != -1) {
	// 	$('.wrap_table > div:nth-child(odd)').addClass('odd');
	// }

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
	        uploadButtonText: buttonDefaultText,
	        allowedExtensions: ['jpg', 'jpeg', 'png', 'gif'],
	        onSubmit: function () {
	            $this.text('Uploading...');
	        },
	        onComplete: function (url, name, size) {
	            $this.text(buttonDefaultText);

	        	if( $this.parent().hasClass('block_img') ){
	        		$this.hide();
	        		$this.closest('.block_img').append('<img src="' + urlCheck + '" alt="">');   
	        		$this.closest('.requiredFields').removeClass('error_validation');
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
	    // if ( $container.has(event.target).length === 0 && $('.datepicker_bottom_block').has(event.target).length === 0 && $('.comiseo-daterangepicker').has(event.target).length === 0 ){
	    //     $container.find('.calendar_block').hide();
	    // }
	});




});;;$(function() {
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
});;;$(function() {
	var $passwordField = $('.password_wrap input');

	function validationPass ($field) {
		if( $field.val() == '' ){
			// alert('пароль не указан');
			$field.focus();
			$field.addClass('error_validation');
			return false;
		}

		if( $field.val().length < 4 ){
			// alert(' должно быть не менее 4-х символов!');
			$field.focus();
			$field.addClass('error_validation');
			return false;
		};

		if(! (/^[a-zA-Z0-9]+$/.test( $field.val() )) ){
			// alert('пароль должен состоять из комбинации латинских букв и арабских цифр!');
			$field.focus();
			$field.addClass('error_validation');
			return false;
		};
	}

	function confirmPass ($field, $fieldConfirm) {
		if( $field.val() == '' || $fieldConfirm.val() == '' ){
			$fieldConfirm.focus();
			return false;
		} else if( $field.val() !== $fieldConfirm.val() ){
			$field.addClass('error_validation');
			$field.removeClass('complete');
			$fieldConfirm.addClass('error_validation');
			$fieldConfirm.removeClass('complete');
		} else {
			$field.removeClass('error_validation');
			$field.addClass('complete');
			$fieldConfirm.removeClass('error_validation');
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

	var $icoStar = $('.ico_star'),
		$search = $('.js_search'),
		speed = 1000,
		speedFast = 500,
		animationBlock = false;

	$icoStar.on ('click', function() {
		$(this).toggleClass('active');
	});

	$search.on('click', function() {
		var $this = $(this),
			$searchBlockWrapper = $('.search_block_wrapper'),
			$searchBlock = $searchBlockWrapper.find('.search_block_wrap');

		if(animationBlock) return;

		$this.toggleClass('active');

		$('body').animate({
		      scrollTop: $searchBlockWrapper.offset().top
		}, speedFast, function () {
			$searchBlock.animate({
			    height: "toggle"
			}, speed, function () {
				animationBlock = false;
			});
		});

		
	});

});;;$(function() {
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
	            $this.hide();
	            $this.closest('.js-img_wrap').append('<img src="' + urlCheck + '" alt="">');           
	        }
	    });

	});

	$imgWrap.on('click', 'img', function (event){
		event.preventDefault();
		
		$(this).closest('.js-img_wrap').find('.js-uploader').trigger('click');
	});
});;$(document).ready(function() {
	
	$('body').on('click', '.js-basket', function (event) {

		event.preventDefault();

		$(this).closest('.block').remove();
	});
	
});$(document).ready(function() {

	$('.ico_star').click(function() {
		$(this).toggleClass('active');
	});

});