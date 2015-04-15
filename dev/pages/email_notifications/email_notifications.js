;$(function() {
	var $popupWrap = $('#popup_block'),
		emailNotifHtml = $('#edit-notification-tpl').html(),
		$emailNotifPopup,
		$emailNotificationItems = $('.email-notification-item');

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
				success: function () {
					closeEmailNotifPopup();

					if(data.id) {
						var idx = _.findIndex(emailNotificationsData, function(item) {
								return item.id == data.id;
							}),
							$changedItem = $emailNotificationItems.filter('[data-id="' + data.id + '"]');

						$.extend(emailNotificationsData[idx], sendData);
						$changedItem.find('.email-notification-label').text(data.label);
						$changedItem.find('.email-notification-subject').text(data.subject);
						$changedItem.find('.email-notification-text').text(data.text);
					}
				},
				error: function (argument) {
					alert('Somethink went wrong');
				}
			});
		});

		$popupWrap.addClass('popup_active').append($emailNotifPopup);
	}

	$('.wrap_table > div:nth-child(odd)').addClass('odd');

	$('.btn-add-notification').on('click', function (event) {
		event.preventDefault();

		openEmailNotifPopup();
	});

	$emailNotificationItems.on('click', function (event) {
		event.preventDefault();
		
		var id = $(event.currentTarget).data('id') + "",
			data = _.where(emailNotificationsData, {id: id})[0];

		openEmailNotifPopup(data);
	});

	$popupWrap.on('click', '#popup_fone', function () {
		closeEmailNotifPopup();
	});
});