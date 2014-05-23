function detailControl($scope, $http) {
	$http.get('/joinsdi/portal?action=getRawData').success(function(data) {
		$scope.visitors = data;
	});

	$scope.orderProp = 'last';
	$scope.reverse = 1;
}