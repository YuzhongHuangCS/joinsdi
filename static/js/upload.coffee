'use strict'

uploaded = false

$ ->
	$('.ui.dropdown').dropdown()
	$('.ui.checkbox').checkbox()
	$('.ui.progress').progress()
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
		if uploaded
			return modalAlert('报名表已上传', '放心吧，报名表已提交')

		for formID in ['#form1', '#form2']
			if not $(formID).form('validate form')
				offsetTop = $(formID).offset().top
				return $('html, body').animate({scrollTop: offsetTop}, 500)

		if not $('#form3').form('get values').workshop.length
			return modalAlert('请选择WorkShop时段', '请至少选择一个WorkShop时段， 时间总是挤出来的嘛')

		doSubmit()

doSubmit = ->
	submitID = ''
	submitForm = ->
		switchModalProgress('正在上传信息表')
		form = {}
		$.extend(form, $('#form1').form('get values'), $('#form3').form('get values'))
		jqxhr = $.post '/joinsdi/upload/form', form, (body)->
			submitID = body
			submitAvatar()

		jqxhr.fail ->
			modalAlert('网络错误', '信息表上传失败。请确认网络链接正常，或向我们反馈')

	submitAvatar = ->
		switchModalProgress('正在上传照片')
		file = document.querySelector('#avatar > input.select').files[0]
		form = new FormData()
		form.append('submitID', submitID)
		form.append('file', file)
		xhr = new XMLHttpRequest()
		xhr.open('post', '/joinsdi/upload/avatar')
		xhr.onload = ->
			if this.status == 200
				submitApply()
			else
				modalAlert('网络错误', '照片上传失败。请确认网络链接正常，或向我们反馈')
		xhr.onerror = ->
			modalAlert('网络错误', '照片上传失败。请确认网络链接正常，或向我们反馈')
		xhr.addEventListener('progress', updateModelProgress)
		xhr.send(form)

	submitApply = ->
		switchModalProgress('正在上传报名表')
		file = document.querySelector('#apply > input.select').files[0]
		form = new FormData()
		form.append('submitID', submitID)
		form.append('file', file)
		xhr = new XMLHttpRequest()
		xhr.open('post', '/joinsdi/upload/apply')
		xhr.onload = ->
			if this.status == 200
				uploaded = true
				modalAlert('上传成功', '我们已经向您所填写的邮箱发送了确认邮件，请注意查收', true)
			else
				modalAlert('网络错误', '报名表上传失败。请确认网络链接正常，或向我们反馈')
		xhr.onerror = ->
			modalAlert('网络错误', '报名表上传失败。请确认网络链接正常，或向我们反馈')
		xhr.addEventListener('progress', updateModelProgress)
		xhr.send(form)

	initModalProgress()
	submitForm()

modalAlert = (header, content, final)->
	element = $('#error')
	element.children('.header').text(header)
	element.children('.content').text(content)
	if final
		element.modal
			allowMultiple: true
			onHide: ->
				$('#progress').modal('hide')
	else
		element.modal
			allowMultiple: true

	element.modal('setting', 'transition', 'vertical flip').modal('show')

initModalProgress = ->
	$('#progress').modal({allowMultiple: true}).modal('setting', 'transition', 'vertical flip').modal('setting', 'closable', false).modal('show')

switchModalProgress = (header)->
	element = $('#progress')
	element.children('.header').text(header)
	element.find('.label').text(header)

updateModelProgress = (event)->
	console.log 'here'
	if event.lengthComputable
		$('#progress .ui.progress').attr('data-percent', event.loaded / event.total)

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
