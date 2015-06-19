function animateSearchBlock() {
    $searchBlock.animate({
        height: searchBlockHeight
    }, speed, function () {
        $searchBlockWrapper.find('.js-tabs_content').animate({
            height: searchBlockHeight + baseIndentValue
        });
        animationBlock = false;
    });
}

function animateSearchWrap(searchField, blockHeight) {
    searchField.animate({
        height: blockHeight + baseIndentValue + 70
    }, speed, function () {
        animationBlock = false;
    });
}

var $search = $('.js_search');
$(function () {
    if ($search && $search.length > 0) {

        var $activitiesSearch = $('.js-activities-search'),
            $searchBlockWrapper = $('.search_block_wrapper'),
            $searchBlock = $searchBlockWrapper.find('.js-tabs_content li.active'),            
            searchBlockHeight = $searchBlock.outerHeight(),
            speed = 500,
            speedFast = 300,
            animationBlock = false,
            baseIndentValue = 20,
            headerFixedHeight = 45;

        $search.on('click', function () {
            var $this = $(this),
                $searchWrap = $this.closest('body').find('.js-form_search-wrap'),
                searchBlockHeight = $searchWrap.find('.search_block_wrap').outerHeight();

            $this.toggleClass('active');
            $btnSelect.toggleClass('active');

            $('body').animate({
                scrollTop: $searchBlockWrapper.offset().top
            }, speedFast, function () {
                if ($this.hasClass('active')) {
                    animateSearchWrap($searchWrap, searchBlockHeight);
                } else {
                    animateSearchWrap($searchWrap, -baseIndentValue);
                }
            });

        });
    }
});