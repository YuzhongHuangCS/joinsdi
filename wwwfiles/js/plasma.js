
/**
 * HTML5 Canvas Plasma (fillRect technique)
 *
 * Kevin Roast 10/8/11
 * fork by PillowSky 5/14/14
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

    requestAnimFrame(loop);
}

(function() {
    Plasma = function() {
        // generate some palettes
        function rgb(r, g, b) {
            g = r;
            b = r;
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