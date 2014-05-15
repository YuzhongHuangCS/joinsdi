$(function() {
    $(window).on('load resize', function() {
        //change stripes_done's size
        var space = document.body.scrollHeight - $('#stripes_done').height();
        $('#stripes_done').css('top', space / 2);
    });
    window.anchor = [{}, {
        "id": "1",
        "hash": "#timeline"
    }, {
        "id": "2",
        "hash": "#video"
    }, {
        "id": "3",
        "hash": "#about"
    }, {
        "id": "4",
        "hash": "#comment"
    }];
    $(window).on('load hashchange', function(event) {
        //mini route
        switch (window.location.hash) {
            case '#timeline':
                detailController(1);
                break;
            case '#video':
                detailController(2);
                break

            case '#about':
                detailController(3);
                break;
            case '#comment':
                detailController(4);
                break;
            default:
                if (event.type === 'load') {
                    indexController();
                } else {
                    window.location.hash = '';
                    location.reload();
                }
        }
    });


    function indexController() {
        //Replace all SVG images with inline SVG
        $('img.svg').each(function() {
            var $img = $(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgStyle = $img.attr('style');
            var imgURL = $img.attr('src');
            $.get(imgURL, function(data) {
                // Get the SVG tag, ignore the rest
                var $svg = $(data).find('svg');

                $svg.attr('id', imgID);
                $svg.attr('class', imgClass + ' replaced-svg');
                $svg.attr('style', imgStyle);
                $img.replaceWith($svg);
            });
        });
        //switch the stripe
        setTimeout(function() {
            $('#stripes_done').fadeIn(2000);
            $('#layer2 path').fadeOut(2000);
        }, 3500);
        //show slogan
        $('#sloagns').animate({
            "top": "15%"
        }, 'normal', function() {
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
            "left": "9%"
        }, {
            "top": "40%",
            "left": "21.5%"
        }, {
            "top": "40%",
            "left": "33.5%"
        }, {
            "top": "40%",
            "left": "46%"
        }];
        //show point 

        function showPoint(pointID) {
            var point = points[pointID];

            $('#point' + pointID).animate({
                "width": "1.6rem",
                "height": "1.6rem",
                "border-radius": "0.8rem",
                "top": point.top,
                "left": point.left
            }, 250, function() {
                if ((++pointID) <= 4) {
                    showPoint(pointID);
                }
            });
        };
        //point hover
        $('.point').mouseenter(function(event) {
            $(this).animate({
                "width": "4.8rem",
                "height": "4.8rem",
                "border-radius": "2.4rem",
                "margin-left": "-1.6rem",
                "margin-top": "-1.6rem"
            }, 'normal');
            $(this).children('p').fadeIn('fast');
        });
        $('.point').mouseleave(function(event) {
            $(this).children('.entry').fadeOut('fast', function() {
                $(this).parent().animate({
                    "width": "1.6rem",
                    "height": "1.6rem",
                    "border-radius": "0.8rem",
                    "margin-left": "0",
                    "margin-top": "0"
                }, 'normal');
            });
        });
        //point click
        $('.point').click(function() {
            location.href = $(this).attr('hash');
        })
    };

    function detailController(tmp) {
        $('.point').off('click mouseleave mouseenter');
        $('#index').css('overflow', 'visible');
        $('.point').css('cursor', 'auto');
        $('#point1').css('z-index', '50');
        $('#index').css('overflow', 'visible');
        $('#nav').hide();
        var target = $('#point1');
        $.get('detail.html', function(data) {
            target.html(data);
            window.section = 1;
            window.scrolling = 0;
            scrollControl(tmp);
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

        function scrollControl(targetID) {
            if (window.scrolling === 0) {
                window.scrolling = 1;
                var scrollTo = $('#section' + targetID).offset().top;
                console.log(scrollTo);
                if (targetID > window.section) {
                    $('html,body').animate({
                        "scrollTop": scrollTo
                    }, 1000, 'easeOutCubic', function() {
                    	window.scrolling = 0;
                        switch (targetID) {
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
                                    "margin-top": "8%"
                                }, 600, 'easeOutCubic', function() {
                                    /* stuff to do after animation is complete */
                                });
                                break;
                            case 4:
                                $('#uyan_frame').animate({
                                        "opacity": "1",
                                        "margin-top": "3%"
                                    },
                                    600, 'easeOutCubic', function() {
                                        /* stuff to do after animation is complete */
                                    });
                                $('#sdi').css({
                                    "opacity": "0",
                                    "margin-top": "10%"
                                });
                                break;
                        }
                        $('#order' + window.section).removeClass('current');
                        window.section = targetID;
                        $('#order' + targetID).addClass('current');
                    });
                };
                if (window.section > targetID) {
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
                                    "margin-top": "8%"
                                }, 400, 'easeOutCubic', function() {
                                    /* stuff to do after animation is complete */
                                });
                                break;
                        }
                        window.scrolling = 0;
                        $('#order' + window.section).removeClass('current');
                        window.section = targetID;
                        $('#order' + targetID).addClass('current');
                    });
                }
            }

        }

        function initDetailView() {
            $('#timeline').delay(500).animate({
                    "margin-top": "6%",
                    "opacity": "1"
                },
                600, 'easeOutCubic', function() {
                    /* stuff to do after animation is complete */
                });

            $(window).mousewheel(function(event) {
                event.preventDefault();
                var targetID;
                if (event.deltaY === -1) {
                    if (window.section >= 4) {
                        targetID = 4;
                    } else {
                        targetID = ++window.section;
                    }
                    //console.log(targetID);
                    scrollControl(targetID);
                };
                if (event.deltaY === 1) {
                    if (window.section <= 1) {
                        targetID = 1;
                    } else {
                        targetID = --window.section;
                    }
                    //console.log(targetID);
                    scrollControl(targetID);
                }
            });
        };

        $('#flag li').click(function(event) {
            console.log('200');
            targetID = $(this).index() + 1;
            scrollControl(targetID);
            console.log(targetID);
        });
    }
});