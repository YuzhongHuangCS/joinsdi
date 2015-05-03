$ ->
	$('.ui.dropdown').dropdown()
	$('.datepicker').datepicker(
		dateFormat: 'yy-mm-dd'
		defaultDate: '1996-01-01'
		beforeShow: (text)->
			if not $(this).val()
				$(this).val('1996-01-01')
	)

	$('#preview').click ->
		$('#avatarFile').click()
	
	$('#place').click ->
		$('#applyFile').click()

	validationRules =
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

	$('#form1').form(validationRules, {
		inline : true,
		on: 'blur'
	})

window.checkApply = (file)->
	if file.files.item(0).size > 104857600
		myAlert('这东西好大啊。。。')
		return false
	else
		$('#imgapply').attr('src', 'static/img/logo.png')

window.previewImage = (file)->
	#console.log(file.files.item(0));
	if (file.files.item(0).size > 10485760)
		myAlert('这个图有点大。。。')
		return false

	if file.files.item(0).type in ['image/pjpeg', 'image/jpeg', 'image/png', 'image/x-png', 'image/gif']
		MAXWIDTH = 128
		MAXHEIGHT = 128
		if (file.files && file.files[0])
			img = document.querySelector('#imghead');
			img.onload = ->
				rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
				img.width = rect.width;
				img.height = rect.height;
				#img.style.marginLeft = rect.left+'px';
				img.style.marginTop = rect.top + 'px';
			
			reader = new FileReader();
			reader.onload = (evt)->
				img.src = evt.target.result;
			reader.readAsDataURL(file.files[0]);
	else
		myAlert('这个是图吗。。。');
		return false;

myAlert = (text)->
	$('#myAlert').fadeIn 'normal', ->
		setTimeout ->
			$('#myAlert').fadeOut(1250)
		, 6000

	$('#myAlert').html(text)
	$('#myAlert').click ->
		$('#myAlert').fadeOut()

clacImgZoomParam = (maxWidth, maxHeight, width, height)->
	param =
		top: 0
		left: 0
		width: width
		height: height

	if width > maxWidth || height > maxHeight
		rateWidth = width / maxWidth
		rateHeight = height / maxHeight

		if rateWidth > rateHeight
			param.width = maxWidth;
			param.height = Math.round(height / rateWidth)
		else
			param.width = Math.round(width / rateHeight)
			param.height = maxHeight;

	param.left = Math.round((maxWidth - param.width) / 2)
	param.top = Math.round((maxHeight - param.height) / 2)
	return param;

window.check = (id)->
	#console.log($('[name=date' + id + ']'))
	target = $('[name=date' + id + ']')
	if target.attr('checked')
		target.removeAttr('checked')
	else
		target.attr('checked', 'checked')

window.submit = ->
	if window.uploaded
		myAlert('放心，你的报名表已经提交了')
		return false;

	checkValid = ->
		checkMust = ->
			$('.must').each (index, value)->
				if not $(this)[0].value
					myAlert('你还有必填项没有填哦')
					$('.must').filter(':eq(' + index + ')').css
						'border': '1px solid rgba(248, 38, 157, 0.5)'
						'box-shadow': '0 0 3px rgba(248, 38, 157, 0.5)'
					return false
				if ((index + 1) == $('.must').length)
					checkTime()

		checkTime = ->
			checkCount = 0;
			$("[type='checkbox']").each (index, val)->
				if $(this).attr("checked")
					checkCount++

			if checkCount == 0
				myAlert('至少选一个时间嘛')
				return false
			else
				#console.log(checkCount);
				do_sumbit();

		checkMust();

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
