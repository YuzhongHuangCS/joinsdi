<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="renderer" content="webkit">
	<title>设计创新班2014招生·报名表回收</title>
	<link rel="stylesheet" href="/joinsdi/css/plugin.css">
	<link rel="stylesheet" href="/joinsdi/css/upload.css">
</head>
<body>
<nav></nav>
<div id="jumbotron">
	<h1>有处可逃·设计创新班2014招生</h1>
	<h2>电子版报名表提交</h2>
</div>
<div class="part" id="part1">
	<div class="line">
		<p><span class="circle"><span class="circleText">1</span></span>个人基本信息</p>
		<hr/>
	</div>
	<form id="form1">
		姓名: <input type="text" class="must" name="name" placeholder="姓名" />
		学号: <input type="text" class="must" name="id" placeholder="学号" />
		<br />
		<span>性别:</span>
  		<label class="radio"><input type="radio" class="must" name="gender" value="male" />男
  		</label>
  		<label class="radio"><input type="radio" class="must" name="gender" value="female" /> 女
  		</label>
  		<span class="birthday">出生年月: </span><input type="text" class="short must" name="birthday" placeholder="YYYY-MM-DD" />
  		<br/>
  		学园: <input type="text" class="must" name="campus" placeholder="学园" />
  		大类: <input type="text" class="must" name="category" placeholder="大类" />
  		<br/>
  		专业: <input type="text" class="must" name="major" placeholder="预确认专业" />
  		<br/>
  		手机: <input type="text" class="must" name="longNum" placeholder="手机长号" />
  		短号: <input type="text" class="must" name="shortNum" placeholder="手机短号" />
  		<br/>
  		电邮: <input type="email" class="must" name="email" placeholder="E-mail" />
  		宿舍地址: <input type="email" class="short must" name="dormitory" placeholder="宿舍地址" />
  		<br/>
  		均绩: <input type="text" class="must" name="gpa" placeholder="所有课程平均绩点" />
  		排名: <input type="text" class="must" name="rank" placeholder="大类排名/大类人数" />
  		<br/>
  		备注: <input type="text" class="long" name="remark" placeholder="备注，无特殊情况请留空" />
  		<p>请填写一些你常去的SNS社区(例如人人，Lofter，Dribbble)</p>
  		<p>和你的用户名。此题为加分项，非必填。</p>
  		网站/用户名 <input type="text" class="midlong" name="favorite" placeholder="网站/用户名;  网站/用户名" />
	</form>
</div>
<div class="part" id="part2">
	<div class="line">
		<p><span class="circle"><span class="circleText">2</span></span>上传文件</p>
		<hr/>
	</div>
	<form id="form2">
		<div id="avatar">
			<p>个人生活照</p>
			<p>jpg/png/gif格式，小于10MB</p>
			<div id="preview">
				<img id="imghead" src='/joinsdi/img/avatar.png'>
			</div>
			<input type="file" onchange="previewImage(this)" id="avatarFile"/>
		</div>
		<div id="apply">
			<p>报名表</p>
			<p>pdf/zip/rar/7z格式，小于100MB</p>
			<div id="place">
				<img id="imghead" src='/joinsdi/img/apply.jpg'>
			</div>
			<input type="file" onchange="checkApply(this)" id="applyFile">
		</div>
	</form>
</div>
<div class="part" id="part3">
	<div class="line">
		<p><span class="circle"><span class="circleText">3</span></span>选择WorkShop时间</p>
		<hr/>
	</div>
	<form id="form3">
		<p>请选择你有空参加WorkShop的时间段(请尽可能地多选)</p>
  		<label class="checkbox"><input type="checkbox" name="date1" value="1" onclick="check(1)"/>6月6日 18:00-20:00
  		</label>
  		<label class="checkbox"><input type="checkbox" name="date2" value="1" onclick="check(2)"/>6月6日 20:30-22:30
  		</label>
  		<label class="checkbox"><input type="checkbox" name="date3" value="1" onclick="check(3)"/>6月7日 18:00-20:00
  		</label>
  		<label class="checkbox"><input type="checkbox" name="date4" value="1" onclick="check(4)"/>6月7日 20:30-22:30
  		</label>
	</form>
</div>
<div id="status">
	<progress id="progressBar" value="0" max="100"></progress>
	<p id="result">正在上传...</p>
</div>
<div id="submit" onclick="submit()">
	<p>提交报名表</p>
</div>

<footer>
	<img id="logo" src="/joinsdi/img/logo.svg">
</footer>

<div id="myAlert"></div>
<script src="/joinsdi/js/jquery.min.js"></script>
<script src="/joinsdi/js/upload.js"></script>
</body>
</html>