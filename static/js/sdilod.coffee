'use strict'

# syntactic sugar
window.$ = angular.element

# app module
sdilodApp = angular.module('sdilodApp', ['ngRoute', 'sdilodCtrl', 'sdilodService'])
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
	).when('/recycle'
		templateUrl: '/joinsdi/static/partial/submit.html'
		controller: 'recycleCtrl'
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

sdilodCtrl.controller 'submitCtrl', ['$scope', 'Valid', ($scope, Valid)->
	$scope.title = '报名表中心'
	$scope.orderProp = 'ID'
	$scope.reverse = 1
	$scope.reverseStr = '1'
	$scope.submits = Valid.query()

	$scope.$watch 'reverseStr', (newValue, oldValue)->
		$scope.reverse = parseInt(newValue)
]

sdilodCtrl.controller 'visitorCtrl', ['$scope', 'Visitor', ($scope, Visitor)->
	$scope.gridOptions =
		enableFiltering: true
		data: Visitor.query()
]

sdilodCtrl.controller 'recycleCtrl', ['$scope', 'InValid', ($scope, InValid)->
	$scope.title = '已删除报名表'
	$scope.orderProp = 'ID'
	$scope.reverse = 1
	$scope.reverseStr = '1'
	$scope.submits = InValid.query()

	$scope.$watch 'reverseStr', (newValue, oldValue)->
		$scope.reverse = parseInt(newValue)
]

# service module
sdilodService = angular.module('sdilodService', ['ngResource'])
sdilodService.factory('Stat', ['$resource', ($resource)->
	$resource('/joinsdi/sdilod/stat')
])

sdilodService.factory('Valid', ['$resource', ($resource)->
	$resource('/joinsdi/sdilod/valid')
])

sdilodService.factory('InValid', ['$resource', ($resource)->
	$resource('/joinsdi/sdilod/invalid')
])

sdilodService.factory('Visitor', ['$resource', ($resource)->
	$resource('/joinsdi/sdilod/visitor')
])
