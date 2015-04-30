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

    function isValidDate(date) {
        var matches = /^(\d{2})[-\/](\d{2})[-\/](\d{4})$/.exec(date);
        if (matches == null) return false;
        var d = matches[2];
        var m = matches[1] - 1;
        var y = matches[3];
        var composedDate = new Date(y, m, d);
        return composedDate.getDate() == d &&
                composedDate.getMonth() == m &&
                composedDate.getFullYear() == y;
    }
    // console.log(isValidDate('10-12-1961'));

    function validationFields () {
        $('.requiredFields').each(function () {
            // debugger
            if( $(this).hasClass('requiredFieldsDate') ) {
                var date = $(this).val();

                if( isValidDate( date ) === false ) {
                    $(this).closest('.btn_big_rounded').addClass('error_validation');
                } else {
                    $(this).closest('.btn_big_rounded').removeClass('error_validation');
                }

            } else if( $(this).hasClass('requiredFieldsSelect') ) {
                if( $(this).find('select').val() > 0 ) {
                    $(this).removeClass('error_validation');
                } else {
                    $(this).addClass('error_validation');
                }
            } else if( $(this).hasClass('requiredFieldsTitle') ) {
                if( $(this).text().length < 4 ){
                    $(this).addClass('error_validation');
                } else {
                    $(this).removeClass('error_validation');
                }
            } else if( $(this).hasClass('requiredFieldsImage') ){
                if( !$(this).find('img').length ) {
                    $(this).addClass('error_validation');
                } else {
                    $(this).removeClass('error_validation');
                }
            } else if( $(this).hasClass('requiredFieldsCheckBox') ) {
                if( !$(this).find('input[type="checkbox"]').is(':checked') ){
                    $(this).addClass('error_validation');
                } else {
                    $(this).removeClass('error_validation');
                }
            } else {
                if( $(this).val().length < 4 ){
                    // alert(' должно быть не менее 4-х символов!');
                    $(this).addClass('error_validation');
                } else{
                    $(this).removeClass('error_validation');
                }
            }

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
        if( $(this).val().length < 4 ) {
            $(this).addClass('error_validation');
        } else {
            $(this).removeClass('error_validation');
        }
    });

    $('form').on('submit', function(event) {
        validationFields();

        if( $('.error_validation').length ) {
            event.preventDefault();
        }
    });
});