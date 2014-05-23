$(function() {
    $(window).on('load resize', function() {
        //change stripes_done's size
        var space = document.body.scrollHeight - $('#stripes_done').height();
        $('#stripes_done').css('top', space / 2);
    })
    $(window).on('load hashchange', function(event) {
        //mini route
        switch (window.location.hash) {
            case '#detail':
                ;
            case '#timeline':
                detailController(1);
                break;
            case '#video':
                detailController(2);
                break;
            case '#about':
                detailController(3);
                break;
            case '#comment':
                detailController(4);
                break;
            case '#index':
                ;
            default:
                if (event.type === 'load') {
                    indexController();
                } else {
                    window.location.hash = '';
                    location.reload();
                };
                break;
        }
    });

    function indexController() {
        //Replace SVG images with inline SVG
        var $img = $('#stripes');
        var imgID = $img.attr('id');
        var imgStyle = $img.attr('style');
        var imgURL = 'img/stripes.svg';
        $.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = $(data).find('svg');

            $svg.attr('id', imgID);
            $svg.attr('style', imgStyle);
            $img.replaceWith($svg);
        });

        //switch the stripe
        setTimeout(function() {
            $('#stripes_done').fadeIn(4000, function() {
                $('#stripes').fadeOut();
            });
        }, 4000);
        //show slogan
        $('#sloagns').animate({
            "top": "15%"
        }, 500, function() {
            //show five point
            showPoint(1);
        });
        //slogan animate
        $(".slogan").on("mouseenter mouseleave", function(e) {

            /** the width and height of the current div **/
            var w = $(this).width();
            var h = $(this).height();

            /** calculate the x and y to get an angle to the center of the div from that x and y. **/
            /** gets the x value relative to the center of the DIV and "normalize" it **/
            var x = (e.pageX - this.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
            var y = (e.pageY - this.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);

            /** the angle and the direction from where the mouse came in/went out clockwise (TRBL=0123);**/
            /** first calculate the angle of the point, add 180 deg to get rid of the negative values divide by 90 to get the quadrant
        add 3 and do a modulo by 4  to shift the quadrants to a proper clockwise TRBL (top/right/bottom/left) **/
            var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;

            /** do your animations here **/
            if (e.type == 'mouseenter') {
                switch (direction) {
                    case 0:
                    case 1:
                        $(this).css({
                            "-webkit-transform": "rotate(30deg)",
                            "transform": "rotate(30deg)"
                        });
                        break;

                    case 2:
                    case 3:
                        $(this).css({
                            "-webkit-transform": "rotate(-30deg)",
                            "transform": "rotate(-30deg)"
                        });
                        break;
                }
            } else {
                $(this).css({
                    "-webkit-transform": "rotate(0deg)",
                    "transform": "rotate(0deg)"
                });
            }
        });
        //points data
        var points = [{}, {
            "top": "40%",
            "left": "10%"
        }, {
            "top": "40%",
            "left": "22.5%"
        }, {
            "top": "40%",
            "left": "34%"
        }, {
            "top": "40%",
            "left": "47.5%"
        }];
        //show point TimeFunction

        function showPoint(pointID) {
            var point = points[pointID];

            $('#point' + pointID).animate({
                "width": "2vw",
                "height": "2vw",
                "top": point.top,
                "left": point.left
            }, 'fast', function() {
                if ((++pointID) <= 4) {
                    showPoint(pointID);
                } else {
                    //point tip
                    var tip = 1;
                    handle = setInterval(function() {
                        $('#point' + tip).mouseover();
                        $('#point' + (tip - 1)).mouseleave();
                        if (++tip >= 6) {
                            clearInterval(handle);
                        }
                    }, 200);
                    //mousewheel tip
                    $(window).mousewheel(function pointTip(event) {
                        if (event.deltaY === -1) {
                            $('.point').mouseover()
                        }
                        if (event.deltaY === 1) {
                            $('.point').mouseleave()
                        }
                    });
                }
            });
        };
        //point hover
        $('.point').on('mouseenter', function() {
            $(this).animate({
                "width": "6vw",
                "height": "6vw",
                "margin-left": "-2vw",
                "margin-top": "-2vw"
            }, 'normal');
            $(this).children('p').fadeIn('fast');
            if (typeof window.detailData === 'undefined') {
                $.get('detail.html', function(data) {
                    window.detailData = data;
                });
            }
        });
        $('.point').on('mouseleave', function() {
            $(this).children('.entry').fadeOut('fast', function() {
                $(this).parent().animate({
                    "width": "2vw",
                    "height": "2vw",
                    "margin-left": "0",
                    "margin-top": "0"
                }, 'normal');
            });
        });
    };

    function detailController(toSection) {
        $('.point').off('click mouseleave mouseenter');
        $('#index').css('overflow', 'visible');
        $('.point').css('cursor', 'default');
        $('#nav').hide();

        var target = $('#point1');
        switch (window.location.hash) {
            case '#detail':
                ;
            case '#timeline':
                target = $('#point1');
                break;
            case '#video':
                target = $('#point2');
                break;
            case '#about':
                target = $('#point3');
                break;
            case '#comment':
                target = $('#point4');
                break;
        }

        if (typeof window.detailData === 'undefined') {
            $.get('detail.html', function(data) {
                window.detailData = data;
                target.html(data);
            });
        } else {
            target.html(window.detailData);
        }
        target.css({
            'z-index': '50'
        });
        target.animate({
            "top": 0,
            "left": 0,
            "width": "100%",
            "height": "100%",
            "margin-top": "0",
            "margin-left": "0"
        }, 'normal', function() {
            initDetailView();
        });

        $.getScript("js/jwplayer.js", function() {
            jwplayer.key = "JP1TQQO7k/D2GehXErMBy4/PDqp9JqxfkW5bIA==";
            jwplayer("jwvideo").setup({
                file: "video/prevue.f4v",
                image: "img/cover.png",
                height: window.screen.availHeight - 300,
                width: window.screen.availWidth - 550
            });
            jwplayer("jwvideo2").setup({
                file: "video/film.mp4",
                image: "img/cover2.png",
                height: window.screen.availHeight - 300,
                width: window.screen.availWidth - 550
            });
        });

        function initDetailView() {
            $('#timeline').delay(500).animate({
                "margin-top": "6%",
                "opacity": "1"
            }, 600, 'easeOutCubic');
            window.section = toSection;
            window.scrolling = 0;
            $('#order' + window.section).addClass('current');
            $('#timeline').animate({
                "margin-top": "6%",
                "opacity": "1"
            }, 600, 'easeOutCubic');
            //click function
            $('#flag li').click(function() {
                var target = $(this).index() + 1;
                scrollToSection(target, 'nav');
            });
            //touch detect
            if ('ontouchstart' in document.documentElement) {
                $('#sdi').css({
                    "opacity": "1",
                    "margin-top": "0"
                });
                $('.ds-thread').css({
                    "opacity": "1",
                    "margin-top": "3%"
                });
            }
            //init scroll
            scrollToSection(toSection);
        }
        $(window).mousewheel(function scrollAction(event) {
            event.preventDefault();
            if (event.deltaY == -1) {
                scrollDown();
                if (window.section == 5) {
                    $('#timeline').css({
                        "margin-top": "6%",
                        "opacity": "1"
                    });
                    $(window).off('mousewheel');
                }
            }
            if (event.deltaY == 1) {
                scrollUp();
            }
        });

        $(document).keydown(function(event) {　　

            var downArray = [32, 34, 40];
            var upArray = [33, 38];　　
            if ($.inArray(event.keyCode, downArray) != -1) {
                scrollDown();
            };
            if ($.inArray(event.keyCode, upArray) != -1) {
                scrollUp();
            };
        });
    };

    function scrollToSection(toSection, config) {
        window.scrolling = 1;
        if(config != 'nav'){
            if(toSection >= 3){
                toSection++;
            }
        }
        window.section = toSection;
        $('#flag li').removeClass('current');
        $('#order' + window.section).addClass('current');
        var scrollTo = $('#section' + toSection).offset().top;
        $('html,body').animate({
            "scrollTop": scrollTo
        }, 1000, 'easeOutCubic', function() {
            switch (toSection) {
                //scroll down animation
                case 2:
                    $('#timeline').css({
                        "opacity": "0",
                        "margin-top": "10%"
                    });
                    break;
                case 4:
                    $('#sdi').animate({
                        "opacity": "1",
                        "margin-top": "0"
                    }, 600, 'easeOutCubic');
                    break;
                case 5:
                    $('.ds-thread').animate({
                        "opacity": "1",
                        "margin-top": "3%"
                    }, 600, 'easeOutCubic');
                    break;
            }
            window.scrolling = 0;
        });
    }

    function scrollDown() {
        if (window.scrolling === 0) {
            window.scrolling = 1;
            if ((++window.section) > 5) {
                window.section = 5;
            }
            $('#flag li').removeClass('current');
            $('#order' + window.section).addClass('current');
            var scrollTo = $('#section' + window.section).offset().top;
            $('html,body').animate({
                "scrollTop": scrollTo
            }, 1000, 'easeOutCubic', function() {
                switch (window.section) {
                    //scroll down animation
                    case 2:
                        $('#timeline').css({
                            "opacity": "0",
                            "margin-top": "10%"
                        });
                        break;
                    case 4:
                        $('#sdi').animate({
                            "opacity": "1",
                            "margin-top": "0"
                        }, 600, 'easeOutCubic');
                        break;
                    case 5:
                        $('.ds-thread').animate({
                            "opacity": "1",
                            "margin-top": "3%"
                        }, 600, 'easeOutCubic');
                        break;
                }
                window.scrolling = 0;
            });
        };
    };

    function scrollUp() {
        if (window.scrolling === 0) {
            window.scrolling = 1;
            if ((--window.section) < 1) {
                window.section = 1;
            }
            $('#flag li').removeClass('current');
            $('#order' + window.section).addClass('current');
            var scrollTo = $('#section' + window.section).offset().top;
            $('html,body').animate({
                "scrollTop": scrollTo
            }, 1000, 'easeOutCubic', function() {
                switch (window.section) {
                    //scroll up animation
                    case 1:
                        $('#timeline').animate({
                            "margin-top": "6%",
                            "opacity": "1"
                        }, 600, 'easeOutCubic');
                        break;
                }
                window.scrolling = 0;
            });
        };
    };
});

function upload() {
    $('#myalert').fadeIn('normal', function() {
        setTimeout(function() {
            $('#myalert').fadeOut(1250);
        }, 3000);
    });
    $('#myalert').html('你不会这么快就填好表了吧<br/>慢慢来，别急');
    $('#myalert').click(function() {
        $('#myalert').fadeOut();
    });
}