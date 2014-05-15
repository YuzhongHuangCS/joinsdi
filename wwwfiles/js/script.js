$(function() {
    $(window).on('load', function() {
        //change stripes_done's size
        var space = document.body.scrollHeight - $('#stripes_done').height();
        $('#stripes_done').css('top', space / 2);
        //mini route
        var hash = window.location.hash;
        if (hash === '#detail') {
            detailController();
        } else {
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
            //change stripes_done's size
            $(window).on('resize', function() {
                var space = document.body.scrollHeight - $('#stripes_done').height();
                $('#stripes_done').css('top', space / 2);
            })
            //switch the stripe
            setTimeout(function() {
                $('#stripes_done').fadeIn(1500);
                $('#layer2 path').fadeOut(1500);
            }, 4000);
            //show slogan
            $('#sloagns').animate({
                "top": "12%"
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
                "left": "30%",
                "text": "Woo展"
            }, {
                "top": "80%",
                "left": "50%",
                "text": "Woo展"
            }, {
                "top": "25%",
                "left": "56%",
                "text": "Woo展"
            }, {
                "top": "55%",
                "left": "60%",
                "text": "Woo展"
            }, {
                "top": "60%",
                "left": "44%",
                "text": "Woo展"
            }];
            //show point TimeFunction

            function showPoint(pointID) {
                var point = points[pointID];

                $('#point' + pointID).animate({
                    "top": point.top,
                    "left": point.left,
                    "width": "1.6rem",
                    "height": "1.6rem",
                    "border-radius": "0.8rem"
                }, 250, function() {
                    if ((++pointID) <= 5) {
                        showPoint(pointID);
                    }
                });
            };
            //point hover
            $('.point').on('mouseenter', function(event) {
                $(this).css({
                    "width": "4.8rem",
                    "height": "4.8rem",
                    "border-radius": "2.4rem",
                    "margin-left": "-1.6rem",
                    "margin-top": "-1.6rem"
                });
                $(this).children('p').delay(250).fadeIn();
            });
            $('.point').on('mouseleave', function(event) {
                $(this).children('.entry').fadeOut(100);
                $(this).css({
                    "width": "1.6rem",
                    "height": "1.6rem",
                    "border-radius": "0.8rem",
                    "margin-left": "0",
                    "margin-top": "0"
                });
            });
            //interaction with mouse
            $(document).mousemove(function(event) {
                var left = -(event.pageX / 5);
                $("#canvas").css('left', left);
            });
            //loadDetailPage
            $('.point').on('click', function(event) {
                window.location.hash = '#detail';
            });
        }
    })

    function detailController() {
        $('.point').off('click mouseleave mouseenter');
        $('#nav').hide();
        $('#point1').animate({
            "top": 0,
            "left": 0,
            "width": "100%",
            "height": "500%",
            "z-index": "25",
            "margin-top": "0",
            "margin-left": "0"
        }, 150, function() {
            $('#index').css('overflow', 'visible');
            var target = $('#point1');
            $.get('/joinus/detail', function(data) {
                target.html(data);
                initdetailView();
            });
        });

        $.getScript("js/jwplayer.js", function() {
            jwplayer.key = "JP1TQQO7k/D2GehXErMBy4/PDqp9JqxfkW5bIA==";
            setTimeout(function() {
                jwplayer("jwvideo").setup({
                    file: "video/preview.mp4",
                    image: "img/cover.png",
                    height: window.screen.availHeight - 350,
                    width: window.screen.availWidth - 550
                });
            }, 1000);
        });
        window.section = 1;
        window.scrolling = 0;
        function initdetailView() {
            $('#timeline').delay(500).animate({
                    "margin-top": "8%",
                    "opacity": "1"
                },
                500, function() {
                    /* stuff to do after animation is complete */
                });
        }
        $(window).mousewheel(function(event) {
            event.preventDefault();
            if (window.scrolling === 0) {
                window.scrolling = 1;
                if (event.deltaY == -1) {
                    if ((++window.section) > 4) {
                        window.section = 4;
                    }
                    var scrollTo = $('#section' + window.section).offset().top;
                    $('html,body').animate({
                        "scrollTop": scrollTo
                    }, 700, function() {
                        if (window.section == 3) {
                            $('#sdi').animate({
                                    "opacity": "1",
                                    "margin-top": "8%"
                                },
                                600, function() {
                                    /* stuff to do after animation is complete */
                                });
                        }
                        window.scrolling = 0;
                    });
                };
                if (event.deltaY == 1) {
                    if ((--window.section) < 1) {
                        window.section = 1;
                    }
                    var scrollTo = $('#section' + window.section).offset().top;
                    $('html,body').animate({
                        "scrollTop": scrollTo
                    }, 700, function() {
                        window.scrolling = 0;
                    });
                }
            }
        });
    };
    $(window).on('hashchange', function() {
        var hash = window.location.hash;
        if (hash == '#detail') {
            detailController();
        } else {
            location.reload();
        }
    });
});
/*
function showSloagn(sloganID){
  $('#slogan' + sloganID).animate({'top': '30%'}, 250, function() {
    if((++sloganID) <= 4){
      showSloagn(sloganID);
    }
    else{
      showPoint(1);
    }
  });
}*/