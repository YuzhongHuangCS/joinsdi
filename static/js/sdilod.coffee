'use strict'

# syntactic sugar
window.$ = angular.element

# app module
sdilodApp = angular.module('sdilodApp', ['ngRoute', 'ngAnimate', 'sdilodCtrl', 'sdilodService'])
sdilodApp.config(['$routeProvider', ($routeProvider)->
	$routeProvider.when('/stat'
		templateUrl: '/joinsdi/static/partial/stat.html'
		controller: 'statCtrl'
	).when('/submit'
		templateUrl: '/joinsdi/static/partial/submit.html'
		controller: 'submitCtrl'
	).when('/visitor'
		templateUrl: '/joinsdi/static/partial/visitor.html'
		controller: 'visitorCtrl'
	).otherwise(
		redirectTo: '/stat'
	)
])

sdilodApp.config(['$compileProvider', ($compileProvider)->
	$compileProvider.debugInfoEnabled(false)
])

# controller module
sdilodCtrl = angular.module('sdilodCtrl', ['ui.grid', 'ui.grid.edit'])
sdilodCtrl.controller 'sidebarCtrl', ['$scope', '$location', ($scope, $location)->
	$scope.$on '$routeChangeSuccess', ->
		for item in document.querySelectorAll('a.item')
			$(item).removeClass('active')
		$(document.querySelector('a.item[href="#' + $location.path() + '"]')).addClass('active')
]

sdilodCtrl.controller 'statCtrl', ['$scope', ($scope)->

]

sdilodCtrl.controller 'submitCtrl', ['$scope', 'Submit', ($scope, Submit)->
	$scope.orderProp = 'timestamp'
	$scope.reverse = 1
	$scope.reverseStr = '1'
	$scope.submits = Submit.query()

	$scope.$watch 'reverseStr', (newValue, oldValue)->
		$scope.reverse = parseInt(newValue)
]
sdilodCtrl.controller 'visitorCtrl', ['$scope', 'Visitor', ($scope, Visitor)->
	$scope.gridOptions =
		enableFiltering: true
		data: Visitor.query()
]

# service module
sdilodService = angular.module('sdilodService', ['ngResource'])
sdilodService.factory('Stat', ['$resource', ($resource)->
	$resource('/joinsdi/sdilod/stat')
])

sdilodService.factory('Submit', ['$resource', ($resource)->
	$resource('/joinsdi/sdilod/submit')
])

sdilodService.factory('Visitor', ['$resource', ($resource)->
	$resource('/joinsdi/sdilod/visitor')
])
