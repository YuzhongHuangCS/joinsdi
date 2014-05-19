<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="renderer" content="webkit">
	<title>SDILOD</title>
	<link rel="stylesheet" href="css/sdilod.css">
	<script src="js/sdilod-plugin.js"></script>
	<script src="js/sdilod.js"></script>
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
			<a href="portal?action=getDayStat" target="_blank" ><button>查看原始JSON数据</button></a>
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
			<a href="portal?action=getAggrStat" target="_blank" ><button>查看原始JSON数据</button></a>
		</div>
	</section>
	<hr/>
	<section id="refer">
		<canvas id="referChart" class="chart"></canvas>
		<div id="referDesc" class="desc">
		<a href="portal?action=getRefer" target="_blank" ><button>查看原始JSON数据</button></a>
		</div>
	</section>
	<footer>
		查看原始访问数据
	</footer>
</body>
</html>