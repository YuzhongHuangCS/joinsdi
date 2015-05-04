module.exports = (grunt)->
	grunt.initConfig
		jade:
			compile:
				files:
					'application/views/home.html': 'application/views/home.jade'
					'application/views/upload.html': 'application/views/upload.jade'
		coffee:
			compile:
				files:
					'static/js/home.js': 'static/js/home.coffee'
					'static/js/upload.js': 'static/js/upload.coffee'
		less:
			compile:
				files:
					'static/css/home.css': 'static/css/home.less'
					'static/css/upload.css': 'static/css/upload.less'
		watch:
			jade:
				files: ['application/views/home.jade', 'application/views/upload.jade']
				tasks: ['jade']
			coffee:
				files: ['static/js/home.coffee', 'static/js/upload.coffee']
				tasks: ['coffee']
		uglify:
			options:
				screwIE8: true
			compile:
				files:
					'static/js/home.js': 'static/js/home.js'
					'static/js/upload.js': 'static/js/upload.js'

	grunt.loadNpmTasks('grunt-contrib-jade')
	grunt.loadNpmTasks('grunt-contrib-less')
	grunt.loadNpmTasks('grunt-contrib-coffee')
	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-contrib-uglify')

	grunt.registerTask('default', ['jade', 'less', 'coffee', 'uglify'])
	grunt.registerTask('develop', ['watch'])
