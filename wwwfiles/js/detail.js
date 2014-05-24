function detailControl($scope, $http) {
	$http.get('/joinsdi/portal?action=getRawData').success(function(data) {
		$scope.visitors = data;
	});

	$scope.orderProp = 'id';
	$scope.reverse = 0;
}