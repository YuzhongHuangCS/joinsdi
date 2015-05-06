'use strict'

$ ->
	new Flame()
	if document.location.href.indexOf('upload') != -1
		bindHandler()

uploaded = false

class Particle
	constructor: (pos)->
		@pos = $.extend({}, pos)
		@radius = 10 + Math.random() * 20
		@life = 20 + Math.random() * 10
		@ttl = @life
		@r = Math.round(Math.random() * 128 + 64)
		@g = Math.round(Math.random() * 128 + 32)
		@b = Math.round(Math.random() * 64)
		@a = 1
		@speed =
			x: -2.5 + Math.random() * 5
			y: -15 + Math.random() * 10

class Flame
	constructor: ->
		@canvas = document.querySelector('canvas#flame')
		@context = @canvas.getContext('2d')

		@W = document.body.clientWidth
		@H = document.body.clientHeight

		@canvas.width = @W
		@canvas.height = @H

		@pos =
			x: @W / 2
			y: @H / 2

		@particles = []
		for i in [0...100]
			@particles.push(new Particle(@pos))

		document.addEventListener('mousemove', @onMouseMove)
		setInterval(@onDraw, 40)

	onMouseMove: (event) =>
		@pos.x = event.clientX
		@pos.y = event.clientY

	onDraw: =>
		@context.clearRect(0, 0, @W, @H)
		@context.globalCompositeOperation = 'lighter'

		for i in [0...@particles.length]
			p = @particles[i]

			@context.beginPath()

			gradient = @context.createRadialGradient(p.pos.x, p.pos.y, 0, p.pos.x, p.pos.y, p.radius)
			gradient.addColorStop(0, "rgba(#{p.r}, #{p.g}, #{p.b}, #{p.a})")
			gradient.addColorStop(0.5, "rgba(#{p.r}, #{p.g}, #{p.b}, #{p.a})")
			gradient.addColorStop(1, "rgba(#{p.r}, #{p.g}, #{p.b}, 0)")
			@context.fillStyle = gradient

			@context.arc(p.pos.x, p.pos.y, p.radius, Math.PI * 2, false)
			@context.fill()

			if (--p.ttl) < 0 or (--p.radius) < 0
				@particles[i] = new Particle(@pos)
			else
				p.a = p.ttl / p.life
				p.pos.x += p.speed.x
				p.pos.y += p.speed.y

bindHandler = ->
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
		inline : true
		on: 'blur'
		keyboardShortcuts: false
	})

	$('#form2').form(form2Rule, {
		inline : true
		on: 'blur'
		keyboardShortcuts: false
	})

	$('#avatar > input.select').change ->
		if this.files.length
			file = this.files[0]
			if file.size > 10485760
				return modalAlert('照片不符合要求', '照片太大了，不要超过10MB哦！')
			if file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase() in ['jpg', 'jpeg', 'png', 'gif']
				reader = new FileReader()
				reader.onload = (event)->
					$('#avatar > img.preview').attr('src', event.target.result)
				reader.readAsDataURL(file)
			else
				return modalAlert('照片不符合要求', '照片格式不对，请上传JPG / PNG / GIF格式的照片。')

	$('#apply > input.select').change ->
		if this.files.length
			file = this.files[0]
			if file.size > 104857600
				return modalAlert('报名表不符合要求', '报名表太大了，不要超过100MB哦！')

			if file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase() in ['pdf', 'zip', 'rar', '7z']
				$('#apply > img.preview').attr('src', '/joinsdi/static/img/logo.png')
			else
				return modalAlert('报名表不符合要求', '报名表格式不对，请上传PDF / ZIP / RAR / 7Z格式的报名表。')

	$('#submit').click ->
		if uploaded
			return modalAlert('报名表已提交', '放心吧，报名表已提交。')

		for formID in ['#form1', '#form2']
			if not $(formID).form('validate form')
				offsetTop = $(formID).offset().top
				return $('html, body').animate({scrollTop: offsetTop}, 500)

		if not $('#form3').form('get values').workshop.length
			return modalAlert('请选择WorkShop时段', '请选择至少一个WorkShop时段，时间总是挤出来的嘛。')

		doSubmit()

formCount = 0
doSubmit = ->
	submitID = ''
	submitForm = ->
		switchModal('正在上传信息表')
		form = $.extend({}, $('#form1').form('get values'), $('#form3').form('get values'))
		jqxhr = $.post('/joinsdi/upload/form', form)
		jqxhr.done (body)->
			if jqxhr.status == 200
				submitID = body
				submitAvatar()
			else
				modalAlert('信息表上传失败', '数据错误，请确认所有栏目已规范填写，并向我们反馈。')
		jqxhr.fail ->
			modalAlert('信息表上传失败', '网络错误，请确认网络连接正常。')

	submitAvatar = ->
		switchModal('正在上传照片')
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
				modalAlert('照片上传失败', '数据错误，请确认上传的照片的大小，格式符合要求，并向我们反馈。')
		xhr.onerror = ->
			modalAlert('照片上传失败', '网络错误，请确认网络连接正常。')
		xhr.upload.addEventListener('progress', updateProgress)
		xhr.send(form)

	submitApply = ->
		switchModal('正在上传报名表')
		formCount = 1
		file = document.querySelector('#apply > input.select').files[0]
		form = new FormData()
		form.append('submitID', submitID)
		form.append('file', file)
		xhr = new XMLHttpRequest()
		xhr.open('post', '/joinsdi/upload/apply')
		xhr.onload = ->
			if this.status == 200
				uploaded = true
				email = $('input[name="email"]').val()
				modalAlert('上传成功', "我们已经向您所填写的邮箱#{email}发送了确认邮件，请注意查收。")
			else
				modalAlert('报名表上传失败', '数据错误，请确认上传的报名表的大小，格式符合要求，并向我们反馈。')
		xhr.onerror = ->
			modalAlert('报名表上传失败', '网络错误，请确认网络连接正常。')
		xhr.upload.addEventListener('progress', updateProgress)
		xhr.send(form)

	initModal()
	initProgress()
	submitForm()

modalAlert = (header, content)->
	element = $('#error')
	element.children('.header').text(header)
	element.children('.content').text(content)
	element.modal('setting', 'transition', 'vertical flip').modal('show')

initModal = ->
	$('#progress').modal('setting', 'transition', 'vertical flip').modal('setting', 'closable', false).modal('show')

switchModal = (header)->
	element = $('#progress')
	element.children('.header').text(header)
	element.find('.label').text(header)

initProgress = ->
	$('#progress .ui.progress').progress
		total: 100
		value: 0

lastPercent = 0
updateProgress = (event)->
	if event.lengthComputable
		percent = Math.round((event.loaded / event.total + formCount) * 50)
		if (diff = percent - lastPercent) > 0
			$('#progress .ui.progress').progress('increment', diff)
			$('#progress .bar .progress').text(percent + '%')
			lastPercent = percent

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
