<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="renderer" content="webkit">
	<title>SDILOD</title>
	<link rel="stylesheet" href="/joinsdi/css/sdilod.css">
	<script src="/joinsdi/js/jquery.min.js"></script>
	<script src="/joinsdi/js/sdilod.js"></script>
</head>
<body>
<header>
	围观小朋友! 嘻嘻
</header>
	<section id="dayStat">
		<canvas id="dayStatChart" class="chart"></canvas>
		<div id="dayStatDesc" class="desc">
			<p>每日新增覆盖人数</p>
			<p>每日新增下载量</p>
			<a href="/joinsdi/sdilod/portal?action=getDayStat" target="_blank" ><button>查看原始JSON数据</button></a>
		</div>
	</section>
	<hr/>
	<section id="aggrStat">
		<canvas id="aggrStatChart" class="chart"></canvas>
		<div id="aggrStatDesc" class="desc">
			<p>鬼畜的PV, UV</p>
			<p>totalPV: 招生页面被访问的总次数, 刷新一次就加一</p>
			<p>totalUV: 访问招生页面的总用户数, 一个浏览器算一个用户</p>
			<p>totalDL: 下载报名表的总用户数, 同一浏览器多次下载不累加</p>
			<p>todayNewUV: 今天新增的访问招生页面的用户数</p>
			<p>todayDL: 今天报名表的下载次数</p>
			<p>todayUV: 今天访问招生页面的用户数</p>
			<table id="table"></table>
			<br/>
			<a href="/joinsdi/sdilod/portal?action=getAggrStat" target="_blank" ><button>查看原始JSON数据</button></a>
		</div>
	</section>
	<hr/>
	<section id="refer">
		<canvas id="referChart" class="chart"></canvas>
		<div id="referDesc" class="desc">
		<a href="/joinsdi/sdilod/portal?action=getRefer" target="_blank" ><button>查看原始JSON数据</button></a>
		</div>
	</section>
	<footer>
		<div onclick="location.href='/joinsdi/sdilod/detail'">查看独立访客数据</div>
		<div onclick="location.href='/joinsdi/sdilod/watch'">查看报名表</div>
	</footer>
</body>
</html>