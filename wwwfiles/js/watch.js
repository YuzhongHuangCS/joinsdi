function watchControl($scope, $http) {
    $http.get('/joinsdi/sdilod/portal?action=getUploadData').success(function(data) {
        for (var i = data.length - 1; i >= 0; i--) {
            data[i].img_src = '/joinsdi/sdilod/portal?action=getAvatar&uploadID=' + data[i].uploadID;
            data[i].file_src = '/joinsdi/sdilod/portal?action=getApply&uploadID=' + data[i].uploadID;
            if(data[i].refer == ''){
                data[i].refer = '直接访问';
            }
        };

        $scope.uploads = data;
    });

    $scope.orderProp = 'timestamp';
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