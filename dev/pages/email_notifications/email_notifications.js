;$(function() {

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

});