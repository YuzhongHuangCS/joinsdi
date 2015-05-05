'use strict'

$ ->
	new Flame()

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

			p.ttl--
			p.radius--
			p.a = p.ttl / p.life
			p.pos.x += p.speed.x
			p.pos.y += p.speed.y

			if p.ttl < 0 or p.radius < 0
				@particles[i] = new Particle(@pos)
