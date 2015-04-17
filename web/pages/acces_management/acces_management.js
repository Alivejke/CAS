;$(function () {
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

                        $changedItem.find('.access-management-item-name').text(data.name);
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
});