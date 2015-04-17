;$(function () {
	var $accessManagementBlock = $('.access-management-block'),
		$accessManagementItems = $accessManagementBlock.find('.access-management-item'),
		accessManagementPopupHtml = $('#popup-acces-managment-tpl').html(),
		$popupWrap = $('#popup_block'),
		$accessPopup;

	function closePopup () {
		$accessPopup.off('click');
		$accessPopup.remove();
		$popupWrap.removeClass('popup_active');
	}

	function openPopup (data) {
		var tpl = _.template(accessManagementPopupHtml);

		$accessPopup = $( tpl({ data: data ? data : {} }) );

		var $form = $accessPopup.find('form');

		$accessPopup.on('click', '.btn-save', function (event) {
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
					closePopup();

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

	    $('input:radio, input:checkbox').checkedPolyfill();
	    $( ".checkbox input:checkbox" ).on( "click", function() {
	           if($(this).is(":checked")) {$(this).parent().addClass('chacked'); }
	           else {$(this).parent().removeClass('chacked');}
	        });
	        
	        $( ".checkbox input:checkbox" ).each(function () {
	            if($(this).is(":checked")) {$(this).parent().addClass('chacked'); }
	            else {$(this).parent().removeClass('chacked');}
	        });
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

		openPopup();
	});

	$popupWrap.on('click', '#popup_fone', function () {
		closePopup();
	});
});