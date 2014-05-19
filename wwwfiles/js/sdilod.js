$(function() {

    var w = window.screen.availWidth;
    var h = window.screen.availHeight;

    $('.chart').attr({
        'width': w / 1.9,
        'height': h / 1.7
    });

    $.get('portal?action=getDayStat', function(data) {
        var date = [];
        var uv = [];
        var dl = [];

        $.each(data, function(index, val) {
            date.push(index);
            uv.push(val.uv);
            dl.push(val.dl);
        });
        var getDayStat = {
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
        new Chart($("#dayStatChart").get(0).getContext("2d")).Line(getDayStat);
    });

    $.get('portal?action=getAggrStat', function(data) {
        var labels = [];
        var datasets = [];

        $.each(data, function(index, val) {
            labels.push(index);
            datasets.push(val);
        })

        var getAggrStat = {
            labels: labels,
            datasets: [{
                fillColor: "rgba(176,106,160,0.5)",
                strokeColor: "rgba(220,220,220,1)",
                data: datasets
            }]
        }
        new Chart($("#aggrStatChart").get(0).getContext("2d")).Bar(getAggrStat);
    });

    $.get('portal?action=getRefer', function(data) {
        var refer = [];
        var count = [];

        $.each(data, function(index, val) {
            refer.push[val.refer];
            count.push[val.count];
        })

        
    });
})