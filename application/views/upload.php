<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="renderer" content="webkit">
	<title>设计创新班2014招生·报名表回收</title>
	<link rel="stylesheet" href="css/plugin.css">
	<link rel="stylesheet" href="css/upload.css">
</head>
<body>
<nav></nav>
<div id="jumbotron">
	<h1>有处可逃·设计创新班2014招生</h1>
	<h2>电子版报名表提交</h2>
</div>
<div class="part">
	<div class="line">
		<p><span class="circle"><span class="circleText">1</span></span>个人基本信息</p>
		<hr/>
	</div>
	<form>
		姓名: <input type="text" name="name" placeholder="姓名" />
		学号: <input type="text" name="id" placeholder="学号" />
		<br />
		<span>性别:</span>
  		<label class="radio"><input type="radio" name="sex" value="male" />男
  		</label>
  		<label class="radio"><input type="radio" name="sex" value="female" /> 女
  		</label>
  		<span class="birthday">出生年月: </span><input type="text" class="short" name="birthday" placeholder="YYYY-MM-DD" />
  		<br/>
  		学园: <input type="text" name="campus" placeholder="学园" />
  		大类: <input type="text" name="class" placeholder="大类" />
  		<br/>
  		专业: <input type="text" name="major" placeholder="预确认专业" />
  		<br/>
  		手机: <input type="text" name="long" placeholder="手机长号" />
  		短号: <input type="text" name="short" placeholder="手机短号" />
  		<br/>
  		电邮: <input type="email" name="email" placeholder="E-mail" />
  		宿舍地址: <input type="email" class="short" name="dormitory" placeholder="宿舍地址" />
  		<br/>
  		均绩: <input type="text" name="gpa" placeholder="所有课程平均绩点" />
  		排名: <input type="text" name="gpa" placeholder="大类排名/大类人数" />
	</form>
</div>
<div class="part">
	<div class="line">
		<p><span class="circle"><span class="circleText">2</span></span>上传文件</p>
		<hr/>
	</div>
	<form>
		<div id="avatar">
			<p>个人生活照</p>
			<div id="preview">
				<img id="imghead" src='img/avatar.png'>
			</div>
			<input type="file" onchange="previewImage(this)"/>
		</div>
		<div id="apply">
			<p>报名表</p>
			<div id="place">
				<img id="imghead" src='img/avatar.png'>
			</div>
			<input type="file">
		</div>
	</form>
</div>
<div class="part">
	<div class="line">
		<p><span class="circle"><span class="circleText">3</span></span>选择WorkShop时间</p>
		<hr/>
	</div>
	<form>
		<p>请选择你有空参加WorkShop的时间段(请尽可能多地选择)</p>
  		<label class="checkbox"><input type="checkbox" name="sex" value="male" />6月6日 18:00-20:00
  		</label>
  		<label class="checkbox"><input type="checkbox" name="sex" value="female" />6月6日 20:30-22:30
  		</label>
  		<label class="checkbox"><input type="checkbox" name="sex" value="male" />6月7日 18:00-20:00
  		</label>
  		<label class="checkbox"><input type="checkbox" name="sex" value="female" />6月7日 20:30-22:30
  		</label>
	</form>
</div>

<div id="submit">
	<p>提交报名表</p>
</div>
<footer>
</footer>
<script src="js/jquery.min.js"></script>
<script src="js/upload.js"></script>
</body>
</html>