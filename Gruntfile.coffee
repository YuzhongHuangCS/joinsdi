module.exports = (grunt)->
	grunt.initConfig
		jade:
			all:
				files:
					'application/views/home.html': 'application/views/home.jade'
					'application/views/upload.html': 'application/views/upload.jade'
					'application/views/mail/submit.html': 'application/views/mail/submit.jade'
					'application/views/bsie.html': 'application/views/bsie.jade'
		coffee:
			all:
				files:
					'static/js/script.js': 'static/js/script.coffee'
		less:
			all:
				options:
					compress: true
					ieCompat: false
				files:
					'static/css/style.css': 'static/css/style.less'
		watch:
			jade:
				files: ['application/views/home.jade', 'application/views/upload.jade', 'application/views/mail/submit.jade', 'application/views/bsie.jade']
				tasks: ['jade']
			coffee:
				files: ['static/js/script.coffee']
				tasks: ['coffee']
		uglify:
			options:
				screwIE8: true
				sourceMap: true
			all:
				files:
					'static/js/script.js': 'static/js/script.js'
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
