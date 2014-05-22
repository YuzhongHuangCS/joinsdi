$(function() {
    $(window).on('load resize', function() {
        //change stripes_done's size
        var space = document.body.scrollHeight - $('#stripes_done').height();
        $('#stripes_done').css('top', space / 2);
    })
    $(window).on('load hashchange', function(event) {
        //mini route
        if (window.location.hash == '#detail') {
            detailController()
        } else {
            if (event.type === 'load') {
                indexController();
            } else {
                window.location.hash = '';
                location.reload();
            }
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
            $('#stripes_done').fadeIn(4000, function(){
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
        $(".slogan").bind("mouseenter mouseleave", function(e) {

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
                "border-radius": "1vw",
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
        $('.point').on('mouseenter', function(event) {
            $(this).animate({
                "width": "6vw",
                "height": "6vw",
                "border-radius": "3vw",
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
        $('.point').on('mouseleave', function(event) {
            $(this).children('.entry').fadeOut('fast', function() {
                $(this).parent().animate({
                    "width": "2vw",
                    "height": "2vw",
                    "border-radius": "1vw",
                    "margin-left": "0",
                    "margin-top": "0"
                }, 'normal');
            });
        });
        //loadDetailPage
        $('.point').on('click', function(event) {
            window.location.hash = '#detail';
        });
    };

    function detailController() {
        $('.point').off('click mouseleave mouseenter');
        $('#index').css('overflow', 'visible');
        $('.point').css('cursor', 'auto');
        $('#nav').hide();

        var target = $('#point1');
        if (typeof window.detailData === 'undefined') {
            $.get('detail.html', function(data) {
                window.detailData = data;
                target.html(data);
            });
        } else {
            target.html(window.detailData);
        }
        $('#point1').css({
            'z-index': '50'
        });
        $('#point1').animate({
            "top": 0,
            "left": 0,
            "width": "100%",
            "height": "500%",
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
        });

        function initDetailView() {
            $('#timeline').delay(500).animate({
                    "margin-top": "6%",
                    "opacity": "1"
                },
                600, 'easeOutCubic', function() {
                    /* stuff to do after animation is complete */
                });
            window.section = 1;
            window.scrolling = 0;
            $('#order' + window.section).addClass('current');
            $('#timeline').animate({
                    "margin-top": "6%",
                    "opacity": "1"
                },
                600, 'easeOutCubic', function() {
                    /* stuff to do after animation is complete */
                });
            $('#flag li').click(function(event) {
                target = $(this).index() + 1;
                if (target > window.section) {
                    scrollDown();
                }
                if (target < window.section) {
                    scrollUp();
                }
            });
            //touch detect
            if ('ontouchstart' in document.documentElement) {
                $('#sdi').css({
                    "opacity": "1",
                    "margin-top": "3vw"
                });
                $('.ds-thread').css({
                    "opacity": "1",
                    "margin-top": "3%"
                });
            }
        }
        $(window).mousewheel(function scrollAction(event) {
            event.preventDefault();
            if (event.deltaY == -1) {
                scrollDown();
                if (window.section == 4) {
                    $('#timeline').css({
                        "margin-top": "6%",
                        "opacity": "1"
                    });
                    $('#sdi').css({
                        "opacity": "1",
                        "margin-top": "3%"
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

    function scrollDown() {
        if (window.scrolling === 0) {
            window.scrolling = 1;
            if ((++window.section) > 4) {
                window.section = 4;
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
                    case 3:
                        $('#sdi').animate({
                            "opacity": "1",
                            "margin-top": "3vw"
                        }, 600, 'easeOutCubic');
                        break;
                    case 4:
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
                            },
                            600, 'easeOutCubic', function() {
                                /* stuff to do after animation is complete */
                            });
                        break;
                    case 3:
                        $('#sdi').animate({
                            "opacity": "1",
                            "margin-top": "3%"
                        }, 400, 'easeOutCubic', function() {
                            /* stuff to do after animation is complete */
                        });
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
    $('#myalert').click(function(event) {
        $('#myalert').fadeOut();
    });
}