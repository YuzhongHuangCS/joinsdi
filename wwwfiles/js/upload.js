$(function() {
    $('.must').blur(function() {
        if (!$(this).val()) {
            $(this).css({
                'border': '1px solid rgba(248, 38, 157, 0.5)',
                'box-shadow': '0 0 3px rgba(248, 38, 157, 0.5)'
            });
        } else {
            $(this).css({
                'border': '1px solid rgba(33, 238, 193, 0.5)',
                'box-shadow': '0 0 3px rgba(33, 238, 193, 0.5)'
            });
        }
    })
})

function submit() {
    function checkValid() {
        $('.must').each(function(index, value) {
            if (!($(this)[0].value)) {
                myAlert('你还有必填项没有填哦')
                return false;
            };
        });
        var checkCount = 0;
        $("[type='checkbox']").each(function(index, val) {
            if ($(this).attr("checked")) {
                checkCount++;
            };
        });
        if (checkCount == 0) {
            myAlert('至少选一个时间嘛');
            return false;
        } else {
            //console.log(checkCount);
            do_sumbit();
        };
    };

    function do_sumbit() {
        $('#status').css('opacity', '1');
        var postData = $('#form1').serialize() + '&' + $('#form3').serialize();
        $.get('/joinsdi/upload/form', postData, function(data, textStatus, xhr) {
            //console.log(data);
            if (data == 'success') {
                $('#result').text('上传成功');
                uploadAvatar();
            } else{
                myAlert("信息表上传出错了><，请重试");
            }
        });
    }

    checkValid();
}


function previewImage(file) {
    var MAXWIDTH = 128;
    var MAXHEIGHT = 128;
    var div = document.getElementById('preview');
    if (file.files && file.files[0]) {
        div.innerHTML = '<img id=imghead>';
        var img = document.getElementById('imghead');
        img.onload = function() {
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            img.width = rect.width;
            img.height = rect.height;
            //img.style.marginLeft = rect.left+'px';
            img.style.marginTop = rect.top + 'px';
        }
        var reader = new FileReader();
        reader.onload = function(evt) {
            img.src = evt.target.result;
        }
        reader.readAsDataURL(file.files[0]);
    } else //兼容IE
    {
        var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
        file.select();
        var src = document.selection.createRange().text;
        div.innerHTML = '<img id=imghead>';
        var img = document.getElementById('imghead');
        img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
        var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
        status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height);
        div.innerHTML = "<div id=divhead style='width:" + rect.width + "px;height:" + rect.height + "px;margin-top:" + rect.top + "px;" + sFilter + src + "\"'></div>";
    }
}

function clacImgZoomParam(maxWidth, maxHeight, width, height) {
    var param = {
        top: 0,
        left: 0,
        width: width,
        height: height
    };
    if (width > maxWidth || height > maxHeight) {
        rateWidth = width / maxWidth;
        rateHeight = height / maxHeight;

        if (rateWidth > rateHeight) {
            param.width = maxWidth;
            param.height = Math.round(height / rateWidth);
        } else {
            param.width = Math.round(width / rateHeight);
            param.height = maxHeight;
        }
    }

    param.left = Math.round((maxWidth - param.width) / 2);
    param.top = Math.round((maxHeight - param.height) / 2);
    return param;
}

function uploadAvatar() {
    var fileObj = document.querySelector('#avatarFile').files[0];
    var fileController = "/joinsdi/upload/avatar";

    var form = new FormData();
    form.append('file', fileObj);

    var xhr = new XMLHttpRequest();

    xhr.open("post", fileController, true);
    xhr.onload = function() {
        if(this.responseText == 'success'){
            uploadApply();
        } else{
            myAlert('照片上传出错了><，请重试');
        }
        
    }
    xhr.upload.addEventListener('progress', progressFunction, false);
    xhr.send(form);
}

function uploadApply() {
    var fileObj = document.querySelector('#applyFile').files[0];
    var fileController = "/joinsdi/upload/apply";

    var form = new FormData();
    form.append('file', fileObj);

    var xhr = new XMLHttpRequest();

    xhr.open("post", fileController, true);
    xhr.onload = function() {
        if(this.responseText == 'success'){
            myAlert('<p>上传成功</p><p>我们已经向你所填写的邮箱发送了确认邮件，请注意查收');
        }else{
            myAlert('申请表上传出错了><，请重试');
        }
    }
    xhr.upload.addEventListener('progress', progressFunction, false);
    xhr.send(form);
}

function progressFunction(event) {
    var progress = document.querySelector('#progressBar');
    if (event.lengthComputable) {
        progressBar.max = event.total;
        progressBar.value = event.loaded;
    }
}

function myAlert(text) {
    $('#myAlert').fadeIn('normal', function() {
        setTimeout(function() {
            $('#myAlert').fadeOut(1250);
        }, 3000);
    });
    $('#myAlert').html(text);
    $('#myAlert').click(function() {
        $('#myAlert').fadeOut();
    });
}

function check(id) {
    //console.log($('[name=date' + id + ']'))
    $('[name=date' + id + ']').attr('checked', 'checked');
}