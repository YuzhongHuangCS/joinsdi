<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="renderer" content="webkit">
	<title>SDILOD-Detail</title>
	<link rel="stylesheet" href="/joinsdi/css/detail.css">
	<script src="/joinsdi/js/angular.min.js"></script>
</head>
<body class="font-hei">
<div id="detail" ng-app ng-controller="detailControl">
	<div id="controlBar">
		<div id="search">搜索：<input ng-model="query" placeholder="快速过滤"></div>
		<div id="sort">点击表头排序</div>
	</div>
	<table>
		<tr>
			<th ng-click="orderProp = 'id'; reverse=!reverse">访客编号</th>
			<th ng-click="orderProp = 'count'; reverse=!reverse">访问计数<span></span></th>
			<th ng-click="orderProp = 'first'; reverse=!reverse">初次访问时间</th>
			<th ng-click="orderProp = 'last'; reverse=!reverse">末次访问时间</th>
			<th ng-click="orderProp = 'download'; reverse=!reverse">下载报名表时间</th>
			<th ng-click="orderProp = 'refer'; reverse=!reverse">来源网址</th>
			<th ng-click="orderProp = 'ua'; reverse=!reverse">UserAgent</th>
		</tr>
    	<tr ng-repeat="visitor in visitors | filter:query | orderBy:orderProp:reverse">
    		<td>{{visitor.id}}</td>
			<td>{{visitor.count}}</td>
			<td>{{visitor.first}}</td>	
			<td>{{visitor.last}}</td>
			<td>{{visitor.download}}</td>
			<td>{{visitor.refer}}</td>
			<td>{{visitor.ua}}</td>
		</tr>
	</table>
</div>

<script src="/joinsdi/js/detail.js"></script>
</body>
</html>