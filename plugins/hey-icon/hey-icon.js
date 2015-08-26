var heyIcon = (function ($) {
    return {
        init: function () {
            var alert = $('<div class="hey-icon">' +
                            '<a href="http://hey-messenger.com/" target="_blank" class="hey-icon__icon"></a>' +
                            '<div class="hey-icon__alert">' +
                                '<i class="hey-icon__close">' +
                                    '<span></span>' +
                                    '<span></span>' +
                                '</i>' +

                                '<span class="hey-icon__heading">hey. messenger</span>' +
                                'Get *real* private messaging today' +
                            '</div>' +
                        '</div>');
            $('body').append(alert);

            alert.on('click', function () {
                alert.fadeOut(150);
            });
        }
    }
})(jQuery);

$(function () {
    heyIcon.init();
});
