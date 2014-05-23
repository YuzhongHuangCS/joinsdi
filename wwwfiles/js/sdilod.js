$(function() {

    var w = window.screen.availWidth;
    var h = window.screen.availHeight;

    $('.chart').attr({
        'width': w / 1.9,
        'height': h / 1.7
    });

    $.getJSON('portal?action=getDayStat', function(data) {
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

    $.getJSON('portal?action=getAggrStat', function(data) {
        var labels = [];
        var datasets = [];
        var th = '<tr>';
        var td = '<tr>';
        $.each(data, function(index, val) {
            labels.push(index);
            th += '<th>' + index + '</th>';
            datasets.push(val);
            td += '<td>' + val + '</td>';
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
        var table = th + '</tr>' + td + '</tr>';
        $('#table').html(table);
    });

    $.getJSON('portal?action=getRefer', function(data) {
        var refers = [];
        var html = '<p>来源网址</p>';

        $.each(data, function(index, val) {
                data[index].color = 'rgba(' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ',0.5)'
                if(val.refer == ''){
                    data[index].refer = '直接访问'
                }
                if(val.count >= 3){
                    html += '<p style="color:' +  data[index].color +'; border-color:' + data[index].color +'">' + val.refer + '&nbsp;&nbsp;' + val.count +'次</p>'           
                }
                var refer = {
                'value': val.count,
                'color': data[index].color
            };
            refers.push(refer);
        })
        new Chart(document.getElementById("referChart").getContext("2d")).Doughnut(refers);
        $('#referDesc').prepend(html);
    });
})