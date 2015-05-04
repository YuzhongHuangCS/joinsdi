module.exports = (grunt)->
	grunt.initConfig
		jade:
			all:
				files:
					'application/views/home.html': 'application/views/home.jade'
					'application/views/upload.html': 'application/views/upload.jade'
					'application/views/mail/submit.html': 'application/views/mail/submit.jade'
		coffee:
			all:
				files:
					'static/js/home.js': 'static/js/home.coffee'
					'static/js/upload.js': 'static/js/upload.coffee'
		less:
			all:
				files:
					'static/css/home.css': 'static/css/home.less'
					'static/css/upload.css': 'static/css/upload.less'
		watch:
			jade:
				files: ['application/views/home.jade', 'application/views/upload.jade', 'application/views/mail/submit.jade']
				tasks: ['jade']
			coffee:
				files: ['static/js/home.coffee', 'static/js/upload.coffee']
				tasks: ['coffee']
		uglify:
			options:
				screwIE8: true
			all:
				files:
					'static/js/home.js': 'static/js/home.js'
					'static/js/upload.js': 'static/js/upload.js'
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
