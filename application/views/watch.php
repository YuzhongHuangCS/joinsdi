<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="renderer" content="webkit">
	<title>SDILOD-Watch</title>
	<link rel="stylesheet" href="/joinsdi/css/watch.css">
	<script src="/joinsdi/js/detail-plugin.js"></script>
	<script src="/joinsdi/js/watch.js"></script>
</head>
<body ng-app ng-controller="watchControl">
	<div id="controlBar">
		<div id="search">搜索: <input ng-model="query" placeholder="快速过滤"></div>
		<div id="count">总计: {{(uploads | filter:query).length}} 项 &nbsp;&nbsp;&nbsp;&nbsp;排序规则:</div>
		<select ng-model="orderProp" class="black">
			<option value="name">姓名</option>
  			<option value="id">学号</option>
  			<option value="birthday">生日</option>
  			<option value="gender">性别</option>
  			<option value="category">大类</option>
  			<option value="major">专业</option>
  			<option value="dormitory">宿舍</option>
  			<option value="gpa">均绩</option>
  			<option value="date1">WorkShop1</option>
  			<option value="date2">WorkShop2</option>
  			<option value="date3">WorkShop3</option>
  			<option value="date4">WorkShop4</option>
  			<option value="uploadID">上传编号</option>
  			<option value="timestamp">上传时间</option>
  			<option value="visitorID">访问编号</option>
  			<option value="count">访问次数</option>
			<option value="first">首次访问时间</option>
			<option value="last">末次访问时间</option>
			<option value="download">下载表格时间</option>
		</select>
		<button id="sort" ng-click="reverse=!reverse" class="black">逆序</button>
	</div>
	<div id="container">
		<div class="item" ng-repeat="upload in uploads | filter:query | orderBy:orderProp:reverse">
			<img ng-src={{upload.img_src}}>
			<table>
				<tr>
					<td>姓名: <b>{{upload.name}}</b></td>
					<td>学号: <b>{{upload.id}}</b></td>
					<td>生日: <b>{{upload.birthday}}</b></td>
					<td>性别: <b>{{upload.gender}}</b></td>
				</tr>
				<tr>
					<td>大类: <b>{{upload.category}}</b></td>
					<td>专业: <b>{{upload.major}}</b></td>
					<td>手机: <b>{{upload.longNum}}</b></td>
					<td>短号: <b>{{upload.shortNum}}</b></td>
				</tr>
				<tr>
					<td>电邮: <b>{{upload.email}}</b></td>
					<td>宿舍: <b>{{upload.dormitory}}</b></td>
					<td>均绩: <b>{{upload.gpa}}</b></td>
					<td>排名: <b>{{upload.rank}}</b></td>
				</tr>
				<tr>
					<td>WorkShop时段:</td>
					<td ng-if="upload.date1"><b>6月6日 18:00-20:00</b></td>
					<td ng-if="upload.date2"><b>6月6日 20:30-22:30</b></td>
					<td ng-if="upload.date3"><b>6月7日 18:00-20:00</b></td>
					<td ng-if="upload.date4"><b>6月7日 20:30-22:30</b></td>
				</td>
				<tr>
					<td colspan="4">备注: <b>{{upload.remark}}</b></td>
				</tr>
				<tr>
					<td colspan="4">社交账号: <b>{{upload.favorite}}</b></td>
				</tr>
				<tr>
					<td>上传编号: <b>{{upload.uploadID}}</b></td>
					<td>上传时间: <b>{{upload.timestamp}}</b></td>
					<td>访问编号: <b>{{upload.visitorID}}</b></td>
					<td>访问次数: <b>{{upload.count}}</b></td>
				</tr>
				<tr>
					<td>首次访问时间: <b>{{upload.first}}</b></td>
					<td>末次访问时间: <b>{{upload.last}}</b></td>
					<td>下载报名表时间: <b>{{upload.download}}</b></td>
					<td>来源网站: <b>{{upload.refer}}</b></td>
				</tr>
				<tr>
					<td colspan="4">UserAgent: <br/><b>{{upload.ua}}</b></td>
				</tr>
				<tr>
					<td colspan="4"><a href={{upload.file_src}}>下载报名表</a></td>
				</tr>
			</table>
		</div>
	</div>
</body>
</html>