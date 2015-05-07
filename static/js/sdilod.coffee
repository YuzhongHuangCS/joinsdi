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

sdilodCtrl.controller 'statCtrl', ['$scope', 'Stat', ($scope, Stat)->

	Stat.get().$promise.then (body)->
		Calendar(body['calendar'])
		Aggr(body['aggr'])
		Refer(body['refer'])

	Calendar = (data)->
		uv = []
		dl = []
		up = []
		for _, day of data
			uv.push(day.uv)
			dl.push(day.dl)
			up.push(day.up)

		calendar =
			labels: Object.keys(data)
			datasets: [{
				fillColor: 'rgba(23, 238, 172, 0.5)'
				strokeColor: 'rgba(220, 220, 220, 1)'
				pointColor: 'rgba(220, 220, 220, 1)'
				pointStrokeColor: '#FFF'
				data: uv
			}, {
				fillColor: 'rgba(248, 38, 157, 0.5)'
				strokeColor: 'rgba(151, 187, 205, 1)'
				pointColor: 'rgba(151, 187, 205, 1)'
				pointStrokeColor: '#FFF'
				data: dl
			}, {
				fillColor: 'rgba(255, 0, 0, 0.5)'
				strokeColor: 'rgba(151, 187, 205, 1)'
				pointColor: 'rgba(151, 187, 205, 1)'
				pointStrokeColor: '#FFF'
				data: up
			}]

		new Chart(document.querySelector('#calendar').getContext('2d')).Line(calendar)

	Aggr = (data)->
		$scope.aggr = data

		count = []
		for _, item of data
			count.push(item)

		aggr =
			labels: Object.keys(data),
			datasets: [{
				fillColor: 'rgba(176, 106, 160, 0.5)'
				strokeColor: 'rgba(220, 220, 220, 1)'
				data: count
			}]

		new Chart(document.querySelector('#aggr').getContext("2d")).Bar(aggr)

	Refer = (data)->
		$scope.refer = data
		refer = []

		for src in data
			src.color = "rgba(#{Math.floor(Math.random()*256)}, #{Math.floor(Math.random()*256)}, #{Math.floor(Math.random()*256)} ,0.5)"
			src.refer = '直接访问' if src.refer == ''
			refer.push
				value: src.count
				color: src.color

		new Chart(document.querySelector('#refer').getContext('2d')).Doughnut(refer)
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
