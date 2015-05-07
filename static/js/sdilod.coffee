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

	$scope.actionText = '删除报名表'
	$scope.action = ->
		if confirm("确认删除上传编号为#{this.submit.ID}，姓名为#{this.submit.name}的报名表？")
			ID = this.submit.ID
			Valid.disable(this.submit).$promise.then ->
				alert('删除成功')
				$scope.submits = $scope.submits.filter (submit)->
					return submit.ID != ID
			, ->
				alert('删除失败')
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

	$scope.actionText = '恢复报名表'
	$scope.action = ->
		if confirm("确认恢复上传编号为#{this.submit.ID}，姓名为#{this.submit.name}的报名表？")
			ID = this.submit.ID
			InValid.enable(this.submit).$promise.then ->
				alert('恢复成功')
				$scope.submits = $scope.submits.filter (submit)->
					return submit.ID != ID
			, ->
				alert('恢复失败')
]

# service module
sdilodService = angular.module('sdilodService', ['ngResource'])
sdilodService.factory('Stat', ['$resource', ($resource)->
	$resource('/joinsdi/sdilod/stat')
])

sdilodService.factory('Valid', ['$resource', ($resource)->
	$resource '/joinsdi/sdilod/valid', {},
		disable:
			url: '/joinsdi/sdilod/disable'
			method: 'POST'
])

sdilodService.factory('InValid', ['$resource', ($resource)->
	$resource '/joinsdi/sdilod/invalid', {},
		enable:
			url: '/joinsdi/sdilod/enable'
			method: 'POST'
])

sdilodService.factory('Visitor', ['$resource', ($resource)->
	$resource('/joinsdi/sdilod/visitor')
])
