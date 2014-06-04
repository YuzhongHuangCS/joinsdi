/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.11
 *
 * Requires: jQuery 1.2.2+
 */
! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a : a(jQuery)
}(function(a) {
    function b(b) {
        var g = b || window.event,
            h = i.call(arguments, 1),
            j = 0,
            l = 0,
            m = 0,
            n = 0,
            o = 0,
            p = 0;
        if (b = a.event.fix(g), b.type = "mousewheel", "detail" in g && (m = -1 * g.detail), "wheelDelta" in g && (m = g.wheelDelta), "wheelDeltaY" in g && (m = g.wheelDeltaY), "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX), "axis" in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m, m = 0), j = 0 === m ? l : m, "deltaY" in g && (m = -1 * g.deltaY, j = m), "deltaX" in g && (l = g.deltaX, 0 === m && (j = -1 * l)), 0 !== m || 0 !== l) {
            if (1 === g.deltaMode) {
                var q = a.data(this, "mousewheel-line-height");
                j *= q, m *= q, l *= q
            } else if (2 === g.deltaMode) {
                var r = a.data(this, "mousewheel-page-height");
                j *= r, m *= r, l *= r
            }
            if (n = Math.max(Math.abs(m), Math.abs(l)), (!f || f > n) && (f = n, d(g, n) && (f /= 40)), d(g, n) && (j /= 40, l /= 40, m /= 40), j = Math[j >= 1 ? "floor" : "ceil"](j / f), l = Math[l >= 1 ? "floor" : "ceil"](l / f), m = Math[m >= 1 ? "floor" : "ceil"](m / f), k.settings.normalizeOffset && this.getBoundingClientRect) {
                var s = this.getBoundingClientRect();
                o = b.clientX - s.left, p = b.clientY - s.top
            }
            return b.deltaX = l, b.deltaY = m, b.deltaFactor = f, b.offsetX = o, b.offsetY = p, b.deltaMode = 0, h.unshift(b, j, l, m), e && clearTimeout(e), e = setTimeout(c, 200), (a.event.dispatch || a.event.handle).apply(this, h)
        }
    }

    function c() {
        f = null
    }

    function d(a, b) {
        return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0
    }
    var e, f, g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        i = Array.prototype.slice;
    if (a.event.fixHooks)
        for (var j = g.length; j;) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
    var k = a.event.special.mousewheel = {
        version: "3.1.11",
        setup: function() {
            if (this.addEventListener)
                for (var c = h.length; c;) this.addEventListener(h[--c], b, !1);
            else this.onmousewheel = b;
            a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this))
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var c = h.length; c;) this.removeEventListener(h[--c], b, !1);
            else this.onmousewheel = null;
            a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function(b) {
            var c = a(b)["offsetParent" in a.fn ? "offsetParent" : "parent"]();
            return c.length || (c = a("body")), parseInt(c.css("fontSize"), 10)
        },
        getPageHeight: function(b) {
            return a(b).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    a.fn.extend({
        mousewheel: function(a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
        },
        unmousewheel: function(a) {
            return this.unbind("mousewheel", a)
        }
    })
});

/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 */

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.extend(jQuery.easing, {
    easeOutCubic: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    }
});

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
                detailController(4);
                break;
            case '#comment':
                detailController(5);
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
        //click
        $('.point').on('click', function() {
            window.location.hash = $(this).attr('hash');
        })
    };

    function detailController(toSection) {
        $('.point').off('click mouseleave mouseenter');
        $('#index').css('overflow', 'visible');
        $('.point').css('cursor', 'auto');
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
                scrollToSection(target);
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

    function scrollToSection(toSection) {
        window.scrolling = 1;
        window.section = toSection;
        $('#flag li').removeClass('current');
        $('#order' + window.section).addClass('current');
        var scrollTo = $('#section' + toSection).offset().top;
        $('html,body').animate({
            "scrollTop": scrollTo
        }, 1000, 'easeOutCubic', function() {
            scrollDownAnim();
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
                scrollDownAnim();
                window.scrolling = 0;
            });
        };
    };

    function scrollDownAnim() {
        switch (window.section) {
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
                }, 600, 'easeOutCubic', function() {
                    $('#timeline').css({
                        "margin-top": "6%",
                        "opacity": "1"
                    });
                    $(window).off('mousewheel');
                });
                break;
        }
    }

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
                scrollUpAnim();
                window.scrolling = 0;
            });
        };
    };

    function scrollUpAnim() {
        switch (window.section) {
            case 1:
                $('#timeline').animate({
                    "margin-top": "6%",
                    "opacity": "1"
                }, 600, 'easeOutCubic');
                break;
        }
    }
});

function upload() {
    $('#myalert').fadeIn('normal', function() {
        setTimeout(function() {
            $('#myalert').fadeOut(1250);
        }, 6000);
    });
    $('#myalert').html('报名表提交已于6月3日截止,<br/>感谢你对设计创新班2013级招生的关注');
    $('#myalert').click(function() {
        $('#myalert').fadeOut();
    });
}