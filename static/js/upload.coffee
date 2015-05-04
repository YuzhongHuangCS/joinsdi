$ ->
	$('.ui.dropdown').dropdown()
	$('.ui.checkbox').checkbox()
	$('.datepicker').datepicker(
		dateFormat: 'yy-mm-dd'
		defaultDate: '1996-01-01'
		beforeShow: (text)->
			if not $(this).val()
				$(this).val('1996-01-01')
	)

	$('#avatar > img.preview').click ->
		$('#avatar > input.select').click()
	
	$('#apply > img.preview').click ->
		$('#apply > input.select').click()


	$('#form1').form(form1Rule, {
		inline : true,
		on: 'blur'
	})

	$('#form2').form(form2Rule, {
		inline : true,
		on: 'blur'
	})

	$('#avatar > input.select').change ->
		if this.files.length
			file = this.files[0]
			if file.size > 10485760
				return modalAlert('照片不符合要求', '照片太大了， 不要超过10MB哦')

			if file.type? and file.type.indexOf('image') != -1
				reader = new FileReader()
				reader.onload = (event)->
					$('#avatar > img.preview').attr('src', event.target.result)
				reader.readAsDataURL(file)
			else
				return modalAlert('照片不符合要求', '照片格式不对， 请上传JPG / PNG / GIF格式的照片')

	$('#apply > input.select').change ->
		if this.files.length
			file = this.files[0]
			if file.size > 104857600
				return modalAlert('报名表不符合要求', '报名表太大了， 不要超过100MB哦')
			else
				$('#apply > img.preview').attr('src', 'static/img/logo.png')

	$('#submit').click ->
		for formID in ['#form1', '#form2']
			if not $(formID).form('validate form')
				offsetTop = $(formID).offset().top
				return $('html, body').animate({scrollTop: offsetTop}, 500)

		if not $('#form3').form('get values').workshop.length
			return modalAlert('请选择WorkShop时段', '请至少选择一个WorkShop时段， 时间总是挤出来的嘛')

		infoForm = {}
		$.extend(infoForm, $('#form1').form('get values'), $('#form3').form('get values'))
		$.post '/joinsdi/upload/form', infoForm, (data, textStatus, xhr)->
			console.log(data, textStatus, xhr)

window.submit = ->
	if window.uploaded
		myAlert('放心，你的报名表已经提交了')
		return false;

	do_sumbit = ->
		return false if window.ing
		window.ing = 1;
		$('#submit p').text('正在上传...');
		$('#result').text('正在上传信息表');
		$('#status').css('opacity', '1');
		
		postData = $('#form1').serialize() + '&' + $('#form3').serialize()
		$.post '/joinsdi/upload/form', postData,  (data, textStatus, xhr)->
			if data == 'success'
				uploadAvatar()
			else
				myAlert('信息表上传出错了><，请重试')
				$('#result').text('信息表上传出错了')
				window.ing = 0
				$('#submit p').text('提交报名表')

	checkValid()

uploadAvatar = ->
	$('#result').text('正在上传照片');
	fileObj = document.querySelector('#avatarFile').files[0];
	fileController = "/joinsdi/upload/avatar";

	form = new FormData();
	form.append('file', fileObj);

	xhr = new XMLHttpRequest();

	xhr.open("post", fileController, true);
	xhr.onload = ->
		if this.responseText == 'success'
			uploadApply()
		else
			myAlert('照片上传出错了><，请重试');
			$('#result').text('照片上传出错了');
			window.ing = 0;
			$('#submit p').text('提交报名表');
	xhr.upload.addEventListener('progress', progressFunction, false);
	xhr.send(form);

uploadApply = ->
	$('#result').text('正在上传报名表');
	fileObj = document.querySelector('#applyFile').files[0];
	fileController = "/joinsdi/upload/apply";

	form = new FormData();
	form.append('file', fileObj);

	xhr = new XMLHttpRequest();
	xhr.open("post", fileController, true);
	#xhr.setRequestHeader("Content-Type","multipart/form-data");
	xhr.onload = ->
		#console.log(this.responseText);
		if this.responseText == 'success'
			myAlert('<p>上传成功</p><p>我们已经向你所填写的邮箱发送了确认邮件，请注意查收');
			$('#result').text('上传成功');
			window.uploaded = 1;
			window.ing = 0;
			$('#submit p').text('上传成功');
		else
			myAlert('报名表上传出错了><，请重试');
			$('#result').text('报名表上传出错了');
			window.ing = 0;
			$('#submit p').text('提交报名表');
	xhr.upload.addEventListener('progress', progressFunction, false)
	xhr.send(form);

progressFunction = (event)->
	progress = document.querySelector('#progressBar')
	if event.lengthComputable
		progressBar.max = event.total;
		progressBar.value = event.loaded;

modalAlert = (header, content)->
	element = $('#error')
	element.children('.header').text(header)
	element.children('.content').text(content)
	element.modal('setting', 'transition', 'vertical flip').modal('show')

form1Rule =
	name:
		identifier: 'name'
		rules: [
			{
				type: 'empty'
				prompt: '请输入姓名'
			}
		]
	num:
		identifier: 'num'
		rules: [
			{
				type: 'empty'
				prompt: '请输入学号'	
			}
			{
				type: 'integer'
				prompt: '学号由10位数字构成'
			}
			{
				type: 'length[10]'
				prompt: '学号由10位数字构成'
			}
			{
				type: 'maxLength[10]'
				prompt: '学号由10位数字构成'
			}
		]
	birthday:
		identifier: 'birthday'
		rules: [
			{
				type: 'empty'
				prompt: '请输入生日'
			}
		]
	gender:
		identifier: 'gender'
		rules: [
			{
				type: 'empty'
				prompt: '请选择性别'
			}
		]
	category:
		identifier: 'category'
		rules: [
			{
				type: 'empty'
				prompt: '请输入大类'
			}
		]
	major:
		identifier: 'major'
		rules: [
			{
				type: 'empty'
				prompt: '请输入专业'
			}
		]
	gpa:
		identifier: 'gpa'
		rules: [
			{
				type: 'empty'
				prompt: '请输入均绩'
			}
		]
	rank:
		identifier: 'rank'
		rules: [
			{
				type: 'empty'
				prompt: '请输入排名'
			}
		]
	phone:
		identifier: 'phone'
		rules: [
			{
				type: 'empty'
				prompt: '请输入手机'
			}
		]
	email:
		identifier: 'email'
		rules: [
			{
				type: 'empty'
				prompt: '请输入电子邮箱'
			}
			{
				type: 'email'
				prompt: '请输入合法的电子邮箱'					
			}
		]
	dormitory:
		identifier: 'dormitory'
		rules: [
			{
				type: 'empty'
				prompt: '请输入寝室'
			}
		]

form2Rule =
	avatar:
		identifier: 'avatar'
		rules: [
			{
				type: 'empty'
				prompt: '请上传个人照片'
			}
		]
	apply:
		identifier: 'apply'
		rules: [
			{
				type: 'empty'
				prompt: '请上传报名表'
			}
		]
