function detailControl($scope, $http) {
    $http.get('/joinsdi/sdilod/portal?action=getRawData').success(function(data) {
        $scope.visitors = data;
    });

    $scope.orderProp = 'last';
    $scope.reverse = 1;
    
    //headroom init
    var controlBar = document.getElementById("controlBar");
    var headroom = new Headroom(controlBar, {
        "tolerance": 5,
        "offset": 205,
        "classes": {
            "initial": "animated",
            "pinned": "slideInDown",
            "unpinned": "slideOutUp"
        }
    });
    headroom.init();
}