$(function () {

    //disable spellcheck
    $("input[type=text], textarea, h1[contenteditable]").attr("spellcheck", "false");

    var $icoStar = $('.ico_star'),
    $menuScrollWrap = $('.menu_scroll_wrap'),
    $btnSelect = $('.js-btn_select'),
    speed = 500,
    speedFast = 300,
    animationBlock = false,
    baseIndentValue = 20,
    headerFixedHeight = 45;


    function animateSearchWrap(searchField, blockHeight) {
        searchField.animate({
            height: blockHeight + baseIndentValue + 70
        }, speed, function () {
            animationBlock = false;
        });
    }

    $icoStar.on('click', function () {
        favouritesClick($(this));
    });

    function favouritesClick(elem) {
        elem.off("click");
        var id = $(elem).data().id;
        var url = "/favourites/toggle/?id=" + id;
        $.post(url, function (data) {
            if (data.result == true) {
                $(elem).toggleClass('active', true);
            }
            else {
                $(elem).toggleClass('active', false);
            }

            $icoStar.on('click', function () {
                favouritesClick($(this)); 
            });
        });
    }

    $btnSelect.on('click', function () {
        var $this = $(this),
            $searchWrap = $this.closest('.search_block_wrapper').next('.content_wrap.bg_gray').find('.js-form_search-wrap'),
            searchBlockHeight = $searchWrap.find('.search_block_wrap').outerHeight();

        $this.toggleClass('active');
        $search.toggleClass('active');

        if ($this.hasClass('active')) {
            animateSearchWrap($searchWrap, searchBlockHeight);
        } else {
            animateSearchWrap($searchWrap, -baseIndentValue - 70);
        }
    });

    $(".image-viewer").on("click", function () {
        var url = $(this).data().url;
        window.popupShow("<img src=" + url + ">");
    });

    $(".popup_overlay, .popup_box").on("click", function () {
        window.popupClose();
    });

    $(document).keyup(function (e) {
        if (e.keyCode == 27 && window.popupOpened) {
            window.popupClose();
        }
    });

    $(document).mousedown(function (e) {
        if (window.popupOpened && e.button == 2) {
            window.popupClose();
        }
    });


    $("[data-goto]").on("click", function () {
        var link = $(this).data().goto;
        $("#LoaderOverlay").show();
        window.location.href = link;
    });


});


window.popupShow = function (content) {
    $(".popup > .popup_box").html(content);
    $(".popup").fadeIn();
    window.popupOpened = true;
}

window.popupClose = function () {
    $(".popup").hide();
    $(".popup > .popup_box").html("");
    window.popupOpened = false;
}

function updateUnobtrusive() {
    $("[data-goto]").on("click", function () {
        var link = $(this).data().goto;
        $("#LoaderOverlay").show();
        window.location.href = link;
    });
}