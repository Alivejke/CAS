;$(function () {
	var $accessManagementBlock = $('.access-management-block'),
		$accessManagementItems = $accessManagementBlock.find('.access-management-item'),
		accessManagementPopupHtml = $('#popup-acces-managment-tpl').html();

	$accessManagementBlock.on('click', '.btn_delete', function (event) {
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
});