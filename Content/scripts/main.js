function refreshFullHeight(item) {
    if (!item || !item.length) return;

    var windowHeight = $(window).height();
    var itemOffset = item.offset().top;
    var footer = $('#footer');
    var height = "100%";

    if (itemOffset > windowHeight)
        height = windowHeight + "px";
    else if (footer.offset().top < windowHeight)
        height = (windowHeight - itemOffset - footer.height()) + "px";
    else
        height = (windowHeight - itemOffset) + "px";

    item.css('min-height', height);
    //item.css('height', height);
}

function refreshFullHeightAll() {
    refreshFullHeight($('.full-height'));
}

$(document).ready(function () {
    var headerOffset = $('#navbar').offset();

    $(window).bind('scroll', function () {
        if ($(window).scrollTop() > headerOffset.top)
            $('#navbar').addClass('navbar-fixed-top');
        else
            $('#navbar').removeClass('navbar-fixed-top');
    });

    $(window).resize(refreshFullHeightAll);

    refreshFullHeightAll();
});

//$.snackbar.display = function (content, style, timeout) {
//    var options = {
//        content: content, // text of the snackbar
//        style: style ? style : '', // add a custom class to your snackbar
//        timeout: timeout ? timeout : 7000, // time in milliseconds after the snackbar autohides, 0 is disabled
//        htmlAllowed: true, // allows HTML as content value
//        onClose: function () { } // callback called when the snackbar gets closed.
//    }

//    $.snackbar(options);
//};

//$.snackbar.success = function (content) {
//    $.snackbar.display(content, 'success');
//};

//$.snackbar.error = function (content) {
//    $.snackbar.display(content, 'error');
//};

$.msg = {
    display: function (content, style, timeout) {
        var options = {
            content: content, // text of the snackbar
            style: style ? style : '', // add a custom class to your snackbar
            timeout: timeout ? timeout : 7000, // time in milliseconds after the snackbar autohides, 0 is disabled
            htmlAllowed: true, // allows HTML as content value
            onClose: function () { } // callback called when the snackbar gets closed.
        }

        $.snackbar(options);
    },
    success: function (content) {
        this.display(content, 'success');
    },
    error: function (content) {
        this.display(content, 'error');
    }
};