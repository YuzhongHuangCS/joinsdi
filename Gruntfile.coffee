module.exports = (grunt)->
	grunt.initConfig
		jade:
			all:
				files:
					'application/views/home.html': 'application/views/home.jade'
					'application/views/upload.html': 'application/views/upload.jade'
					'application/views/mail/submit.html': 'application/views/mail/submit.jade'
					'application/views/bsie.html': 'application/views/bsie.jade'
					'application/views/login.html': 'application/views/login.jade'
					'application/views/sdilod.html': 'application/views/sdilod.jade'
					'static/partial/stat.html': 'static/partial/stat.jade'
					'static/partial/submit.html': 'static/partial/submit.jade'
					'static/partial/visitor.html': 'static/partial/visitor.jade'
		coffee:
			all:
				files:
					'static/js/script.js': 'static/js/script.coffee'
					'static/js/sdilod.js': 'static/js/sdilod.coffee'
		less:
			all:
				options:
					compress: true
					ieCompat: false
				files:
					'static/css/style.css': 'static/css/style.less'
					'static/css/login.css': 'static/css/login.less'
					'static/css/sdilod.css': 'static/css/sdilod.less'
		watch:
			jade:
				files: ['application/views/home.jade', 'application/views/upload.jade', 'application/views/mail/submit.jade', 'application/views/bsie.jade', 'application/views/login.jade', 'application/views/sdilod.jade', 'static/partial/stat.jade', 'static/partial/submit.jade', 'static/partial/visitor.jade']
				tasks: ['jade']
			coffee:
				files: ['static/js/script.coffee', 'static/js/sdilod.coffee']
				tasks: ['coffee']
		uglify:
			options:
				screwIE8: true
				sourceMap: true
			all:
				files:
					'static/js/script.js': 'static/js/script.js'
					'static/js/sdilod.js': 'static/js/sdilod.js'
		shell:
			all:
				command: 'bash dist.sh'

	grunt.loadNpmTasks('grunt-contrib-jade')
	grunt.loadNpmTasks('grunt-contrib-less')
	grunt.loadNpmTasks('grunt-contrib-coffee')
	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-contrib-uglify')
	grunt.loadNpmTasks('grunt-shell')

	grunt.registerTask('develop', ['watch'])
	grunt.registerTask('default', ['jade', 'less', 'coffee', 'uglify'])
	grunt.registerTask('release', ['jade', 'less', 'coffee', 'uglify', 'shell'])
