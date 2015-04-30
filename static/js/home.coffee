$ ->
	$('img#logo').hover ->
		$(this).attr('src', 'static/img/box_open.png')
	, ->
		$(this).attr('src', 'static/img/box_close.png')
	initFlame()

initFlame = ->
	canvas = document.querySelector('canvas#flame')
	ctx = canvas.getContext('2d')
	#Make the canvas occupy the full page
	W = window.innerWidth
	H = window.innerHeight

	track_mouse = (e) ->
		#since the canvas = full page the position of the mouse 
		#relative to the document will suffice
		mouse.x = e.pageX
		mouse.y = e.pageY

	particle = ->
		#speed, life, location, life, colors
		#speed.x range = -2.5 to 2.5 
		#speed.y range = -15 to -5 to make it move upwards
		#lets change the Y speed to make it look like a flame
		@speed =
			x: -2.5 + Math.random() * 5
			y: -15 + Math.random() * 10
		#location = mouse coordinates
		#Now the flame follows the mouse coordinates
		if mouse.x and mouse.y
			@location =
				x: mouse.x
				y: mouse.y
		else
			@location =
				x: W / 2
				y: H / 2
		#radius range = 10-30
		@radius = 10 + Math.random() * 20
		#life range = 20-30
		@life = 20 + Math.random() * 10
		@remaining_life = @life
		#colors
		@r = Math.round(Math.random() * 255)
		@g = Math.round(Math.random() * 255)
		@b = Math.round(Math.random() * 255)

	draw = ->
		#Painting the canvas black
		#Time for lighting magic
		#particles are painted with "lighter"
		#In the next frame the background is painted normally without blending to the 
		#previous frame
		#ctx.globalCompositeOperation = 'source-over'
		#ctx.fillStyle = 'white'
		ctx.clearRect 0, 0, W, H
		#ctx.globalCompositeOperation = 'multiply'
		i = 0
		while i < particles.length
			p = particles[i]
			ctx.beginPath()
			#changing opacity according to the life.
			#opacity goes to 0 at the end of life of a particle
			p.opacity = Math.round(p.remaining_life / p.life * 100) / 100
			#a gradient instead of white fill
			gradient = ctx.createRadialGradient(p.location.x, p.location.y, 0, p.location.x, p.location.y, p.radius)
			gradient.addColorStop 0, 'rgba(' + p.r + ', ' + p.g + ', ' + p.b + ', ' + p.opacity + ')'
			gradient.addColorStop 0.5, 'rgba(' + p.r + ', ' + p.g + ', ' + p.b + ', ' + p.opacity + ')'
			gradient.addColorStop 1, 'rgba(' + p.r + ', ' + p.g + ', ' + p.b + ', 0)'
			ctx.fillStyle = gradient
			ctx.arc(p.location.x, p.location.y, p.radius, Math.PI * 2, false)
			ctx.fill()
			#lets move the particles
			p.remaining_life--
			p.radius--
			p.location.x += p.speed.x
			p.location.y += p.speed.y
			#regenerate particles
			if p.remaining_life < 0 or p.radius < 0
				#a brand new particle replacing the dead one
				particles[i] = new particle
			i++

	canvas.width = W
	canvas.height = H
	particles = []
	mouse = {}
	#Lets create some particles now
	particle_count = 100
	i = 0
	while i < particle_count
		particles.push new particle
		i++
	#finally some mouse tracking
	document.addEventListener('mousemove', track_mouse)
	setInterval draw, 33
