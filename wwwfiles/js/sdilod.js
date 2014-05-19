$(function() {

    var w = window.screen.availWidth;
    var h = window.screen.availHeight;

    $('#dayStatChart').attr({
        'width': w/1.9,
        'height': h/1.7
    });
    var date = [];
    var uv = [];
    var dl = [];

    $.get('portal?action=getDayStat', function(data) {
        $.each(data, function(index, val) {
            date.push(index);
            uv.push(10 + val.uv);
            dl.push(val.dl);
        });
        var lineChartData = {
            labels: date,
            datasets: [{
                fillColor: "rgba(23,238,172,0.5)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                data: uv
            }, {
                fillColor: "rgba(248,38,157,0.5)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                data: dl
            }]

        }
        var myLine = new Chart($("#dayStatChart").get(0).getContext("2d")).Line(lineChartData);
    });
})