module.exports = (grunt)->
	grunt.initConfig
		jade:
			compile:
				files:
					'application/views/home.html': 'application/views/home.jade'
		coffee:
			compile:
				files:
					'static/js/script.js': 'static/js/script.coffee'
		less:
			compile:
				files:
					'static/css/style.css': 'static/css/style.less'
		watch:
			jade:
		    	files: ['application/views/home.jade']
		    	tasks: ['jade']
		    coffee:
		    	files: ['static/js/script.coffee']
		    	tasks: ['coffee']


	grunt.loadNpmTasks('grunt-contrib-jade')
	grunt.loadNpmTasks('grunt-contrib-less')
	grunt.loadNpmTasks('grunt-contrib-coffee')
	grunt.loadNpmTasks('grunt-contrib-watch')

	grunt.registerTask('default', ['jade', 'less', 'coffee'])
	grunt.registerTask('develop', ['watch'])
