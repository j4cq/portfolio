$(window).load(function () {

    // preloader
    $preloader = $('.preloader');

    $preloader.addClass('preloader--complete');

    window.setTimeout(function () {
        $preloader.fadeOut();
    }, 1000);

});

$(function () {

    FastClick.attach(document.body);


    function isMobile() {
        var userAgent = navigator.userAgent;

        return (userAgent.match(/i(Phone|Pod|Pad)|Android/i) || window.matchMedia("only screen and (max-width: 740px)").matches);
    }


    // helpers

    $('html').removeClass('no-js');

    if (isMobile()) {
        $('html').removeClass('no-touch').addClass('touch');
    }


    $('body').addClass(isMobile() ? 'screen--mobile' : 'screen--standard');
    $('.current-year').html(new Date().getFullYear());
    $('.start-year').html(new Date().getFullYear() - 2007);


    // menu
    $('.menu__icon').on('click', function () {
        $('.menu').toggleClass('menu--active');
    })


    // portfolio
    var $portfolioItems = $('#portfolio-items'),
        $portfolioModal = $('#portfolio-modal');

    // get portfolio data
    var portfolioData;

    $.ajax({
        url: 'js/portfolio.json',
        dataType: 'json',
        success: function (data) {
            portfolioData = data;

            createPortfolio();
        }
    });

    var itemTemplate = $('#item-template').html(),
        modalTemplate = $('#modal-template').html();

    Mustache.parse(itemTemplate);
    Mustache.parse(modalTemplate);


    function createPortfolio() {
        for (var i = 0; i < portfolioData.length; i++) {
            portfolioData[i].id = i;

            var output = Mustache.render(itemTemplate, portfolioData[i]);

            $portfolioItems.append(output);
        }
    }

    $portfolioItems.on('click', '.show-modal', function (event) {
        showModal($(this).data('id'));

        event.preventDefault();
    })

    $portfolioModal.on('click', closeModal);

    $portfolioModal.on('click', '.modal__close', closeModal);

    $portfolioModal.on('click', '.modal__content', function (event) {
        event.stopPropagation();
    });

    function showModal(id) {
        var output = Mustache.render(modalTemplate, portfolioData[id]);

        $portfolioModal.html(output).addClass('modal--active');

        $portfolioModal.find('.modal__hero img').on('load', function () {
            $portfolioModal.addClass('modal--loaded');
        });
    }

    $portfolioModal.on('load', '.modal__hero img', function () {
        $portfolioModal.addClass('modal--loaded');
    });

    function closeModal() {
        $('.modal').removeClass('modal--active').removeClass('modal--loaded');
    }




    // canvas check
    function supports_canvas(){
        return !!document.createElement('canvas').getContext;
    }




    // scroll path
    var preloadPosition;

    if (supports_canvas() && !isMobile()){
        $("body").addClass("scroll-view");

        // disable generic behaviour
        document.body.ontouchmove = disableoverflow;
        $(".anchor").remove();

        // init scroll path
        initScrollpath($("#scroll-view"));

        // preloader
        var preloadPosition = $('.preloader-position').offset();
    } else {
        // internal links
        $('a.internal').on('click', scrollTo);
        $('a.internal').on('touchstart', scrollTo);

        function scrollTo(event) {
            var $link = $(this);

            $('.menu').removeClass('menu--active');

            $('body').animate({
                scrollTop: $($link.attr('href')).offset().top
            }, 200);

            event.preventDefault();
        }

        // preloader
        var preloadPosition = $('.preloader-position').offset();
    }

    // position preload title
    $('.preloader__icon').css({
        top: preloadPosition.top,
        left: preloadPosition.left
    });

    window.setTimeout(function () {
        $('.preloader').addClass('preloader--start');
    }, 100);
});






function initScrollpath(element){

    // draw path
    $.fn.scrollPath("getPath")
        // move to 'intro'
        .moveTo(400, 50, {
            name: "intro"
        })

        // line to 'about'
        .lineTo(400, 800, {
            name: "about"
        })

        // arc to 'skills'
        .arc(-90, 1150, 600, 1.8*Math.PI, Math.PI, true, {
            name: "skills",
            rotate: Math.PI/2
        })

        // line to 'portfolio'
        .lineTo(700, 1600, {
            name: "portfolio",
            rotate: 0
        })

        // arc to 'contact'
        .arc(700, 800, 800, Math.PI/2, 0, true, {
            name: "contact",
            rotate: Math.PI/2
        })

        // continue line
        .lineTo(800, -350, {
            rotate: (0.25*Math.PI)
        })

        // arc to beginning
        .arc(800, 50, 400, 1.5*Math.PI, Math.PI, true, {
            rotate: 0,
            name: "end"
        });

    // initiate plugin on wrapper
    element.scrollPath({
        drawPath: true,
        wrapAround: true
    });

    // add scroll functionality to anchors
    $("a.internal").each(function(){
        var target = this.getAttribute("href").replace("#", "");

        $(this).click(function(e){
            e.preventDefault();

            // scroll to location
            $.fn.scrollPath("scrollTo", target, 1300, "easeInOutSine");
        });
    });
}

function disableoverflow(){
    var target = event.target;

    var currentPosition = '';

    if(!$(event.target).is('.contentScroll *, .contentScroll') || $('.contentScroll').scrollTop() == 0)
        event.preventDefault();
}
