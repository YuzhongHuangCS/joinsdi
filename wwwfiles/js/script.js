$(function() {
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
    $(window).on('load resize', function() {
        var space = document.body.scrollHeight - $('#stripes_done').height();
        $('#stripes_done').css('top', space / 2);
    })

    setTimeout(function() {
        $('#stripes_done').fadeIn(1500);
    }, 4000);

    $('#sloagns').animate({
        "top": "12%"
    }, 500, function() {
        showPoint(1);
    });

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

    $(document).mousemove(function(event) {
        var left = -(event.pageX / 5);
        $("#canvas").css('left', left);
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
window.points = [{}, {
    "top": "40%",
    "left": "30%"
}, {
    "top": "80%",
    "left": "50%"
}, {
    "top": "25%",
    "left": "56%"
}, {
    "top": "55%",
    "left": "60%"
}, {
    "top": "60%",
    "left": "44%"
}]

function showPoint(pointID) {
    var point = window.points[pointID];

    $('#point' + pointID).animate({
        "top": point.top,
        "left": point.left,
        "width": "1.6rem",
        "height": "1.6rem"
    }, 250, function() {
        if ((++pointID) <= 5) {
            showPoint(pointID);
        }
    });
};

/**
 * HTML5 Canvas Plasma (fillRect technique)
 *
 * Kevin Roast 10/8/11
 */

var RAD = Math.PI / 180.0;
var Sin = Math.sin;
var Cos = Math.cos;
var Sqrt = Math.sqrt;

var HEIGHT;
var WIDTH;
var g_plasma;
var g_canvas;
var g_framestart;

window.addEventListener('load', onloadHandler, false);
window.addEventListener('resize', resizeHandler, false);

/**
 * Global window onload handler
 */

function onloadHandler() {
    // fullscreen the canvas element
    g_canvas = document.getElementById('canvas');
    WIDTH = g_canvas.width = window.innerWidth;
    HEIGHT = g_canvas.height = window.innerHeight;

    // create the Plasma object
    g_plasma = new Plasma();

    // init the animation loop
    g_framestart = Date.now();
    requestAnimFrame(loop);
}

/**
 * Global window resize handler
 */

function resizeHandler() {
    if (g_canvas) {
        WIDTH = g_canvas.width = window.innerWidth;
        HEIGHT = g_canvas.height = window.innerHeight;
    }
}

/**
 * Main render loop
 */

function loop() {
    var frameStart = Date.now();

    g_plasma.frame.call(g_plasma)

    if (g_plasma.ShowFPS) {
        var g = g_canvas.getContext('2d');
        g.save();
        g.globalAlpha = 1;
        g.fillStyle = "#000";
        g.fillRect(0, 26, 72, 16);
        g.font = "12pt Courier New";
        g.fillStyle = "#FFF";
        g.fillText("FPS: " + Math.round(1000 / (frameStart - g_framestart)), 0, 38);
        g_framestart = frameStart;
        g.restore();
    }

    requestAnimFrame(loop);
}

(function() {
    Plasma = function() {
        // generate some palettes
        function rgb(r, g, b) {
            return "rgb(" + r.toString() + "," + g.toString() + "," + b.toString() + ")";
        }

        this.palettes = [];

        var palette = [];
        for (var i = 0; i < 256; i++) {
            palette.push(rgb(i, i, i));
        }
        this.palettes.push(palette);

        palette = [];
        for (var i = 0; i < 128; i++) {
            palette.push(rgb(i * 2, i * 2, i * 2));
        }
        for (var i = 0; i < 128; i++) {
            palette.push(rgb(255 - (i * 2), 255 - (i * 2), 255 - (i * 2)));
        }
        this.palettes.push(palette);

        palette = new Array(256);
        for (var i = 0; i < 64; i++) {
            palette[i] = rgb(i << 2, 255 - ((i << 2) + 1), 64);
            palette[i + 64] = rgb(255, (i << 2) + 1, 128);
            palette[i + 128] = rgb(255 - ((i << 2) + 1), 255 - ((i << 2) + 1), 192);
            palette[i + 192] = rgb(0, (i << 2) + 1, 255);
        }
        this.palettes.push(palette);

        palette = [];
        for (var i = 0, r, g, b; i < 256; i++) {
            r = ~~ (128 + 128 * Sin(Math.PI * i / 32));
            g = ~~ (128 + 128 * Sin(Math.PI * i / 64));
            b = ~~ (128 + 128 * Sin(Math.PI * i / 128));
            palette.push(rgb(r, g, b));
        }
        this.palettes.push(palette);

        palette = [];
        for (var i = 0, r, g, b; i < 256; i++) {
            r = ~~ (Sin(0.3 * i) * 64 + 190),
            g = ~~ (Sin(0.3 * i + 2) * 64 + 190),
            b = ~~ (Sin(0.3 * i + 4) * 64 + 190);
            palette.push(rgb(r, g, b));
        }
        this.palettes.push(palette);

        // init public properties for the GUI controls
        this.CycleSpeed = 1;
        this.ShowFPS = false;
        this.PlasmaDensity = 64;
        this.TimeFunction = 512;
        this.PlasmaFunction = 0;
        this.Jitter = 8;
        this.Alpha = 0.1;
        this.PaletteIndex = 2;

        return this;
    };

    Plasma.prototype = {
        // public properties - exposed by GUI controls
        ShowFPS: false,
        CycleSpeed: 0,
        PlasmaDensity: 0,
        TimeFunction: 0,
        PlasmaFunction: 0,
        Jitter: 0,
        Alpha: 0.0,
        PaletteIndex: 0,

        // internal properties
        paletteoffset: 0,
        palettes: null,

        // animation frame rendering function
        frame: function frame() {
            // init context and img data buffer
            var w = WIDTH,
                h = HEIGHT, // canvas width and height
                pw = this.PlasmaDensity,
                ph = (pw * (h / w)), // plasma source width and height
                ctx = g_canvas.getContext('2d'),
                palette = this.palettes[this.PaletteIndex],
                paletteoffset = this.paletteoffset += this.CycleSpeed,
                plasmafun = this.PlasmaFunction;
            // scale the plasma source to the canvas width/height
            var vpx = (w / pw),
                vpy = (h / ph);

            var dist = function dist(a, b, c, d) {
                return Sqrt((a - c) * (a - c) + (b - d) * (b - d));
            }

            var time = Date.now() / this.TimeFunction;

            var colour = function colour(x, y) {
                switch (plasmafun) {
                    case 0:
                        return ((Sin(dist(x + time, y, 128.0, 128.0) / 8.0) + Sin(dist(x - time, y, 64.0, 64.0) / 8.0) + Sin(dist(x, y + time / 7, 192.0, 64) / 7.0) + Sin(dist(x, y, 192.0, 100.0) / 8.0)) + 4) * 32;
                        break;
                    case 1:
                        return (128 + (128 * Sin(x * 0.0625)) +
                            128 + (128 * Sin(y * 0.03125)) +
                            128 + (128 * Sin(dist(x + time, y - time, w, h) * 0.125)) +
                            128 + (128 * Sin(Sqrt(x * x + y * y) * 0.125))) * 0.25;
                        break;
                }
            }

            ctx.save();
            ctx.globalAlpha = this.Alpha;
            var jitter = this.Jitter ? (-this.Jitter + (Math.random() * this.Jitter * 2)) : 0;
            for (var y = 0, x; y < ph; y++) {
                for (x = 0; x < pw; x++) {
                    // map plasma pixels to canvas pixels using the virtual pixel size
                    ctx.fillStyle = palette[(~~colour(x, y) + paletteoffset) % 256];
                    ctx.fillRect(x * vpx + jitter, y * vpy + jitter, vpx, vpy);
                }
            }
            ctx.restore();
        }
    };
})();

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback, element) {
            window.setTimeout(callback, 1000 / 60);
    };
})();


//detailPage

$('.point').click(function(event) {
    $(this).animate({
        "top": 0,
        "left": 0,
        "width": "100%",
        "height": "500%",
        "z-index": "25"
    }, 150, function() {
        var target = $(this);
        $.get('/joinus/detail', function(data) {
            target.html(data);
            loadDetail();
        });
    });
});

function loadDetail() {
    $.getScript("js/jwplayer.js", function() {
        showTimeLine(1);
        jwplayer.key="JP1TQQO7k/D2GehXErMBy4/PDqp9JqxfkW5bIA==";
        jwplayer("jwvideo").setup({
            file: "video/preview.mp4",
            image: "img/cover.png",
            height: window.screen.availHeight - 350,
            width: window.screen.availWidth - 550
        });
    });
}

function showTimeLine(i) {
    $('#timepoint' + i).animate({
        opacity: 0.8
    }, 300, 'linear', function() {
        $('#line' + i).animate({
            opacity: 0.8,
            width: 50
        }, 200, function() {
            if (++i <= 7) {
                showTimeLine(i);
            }
        });
    });
};