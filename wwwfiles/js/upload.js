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
    window.uploaded = 0;

    $('#preview').click(function() {
        $('#avatarFile').click();
    });
    $('#place').click(function() {
        $('#applyFile').click();
    });
})

function submit() {
    if (window.uploaded) {
        myAlert('放心，你的报名表已经提交了');
        return false;
    }

    function checkValid() {
        function checkMust() {
            $('.must').each(function(index, value) {
                if (!($(this)[0].value)) {
                    myAlert('你还有必填项没有填哦');
                    $('.must').filter(':eq(' + index + ')').css({
                        'border': '1px solid rgba(248, 38, 157, 0.5)',
                        'box-shadow': '0 0 3px rgba(248, 38, 157, 0.5)'
                    });
                    return false;
                };
                if ((index + 1) == $('.must').length) {
                    checkTime();
                }
            });
        }

        function checkTime() {
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
        }
        checkMust();
    };

    function do_sumbit() {
        $('#result').text('正在上传信息表');
        $('#status').css('opacity', '1');
        var postData = $('#form1').serialize() + '&' + $('#form3').serialize();
        $.post('/joinsdi/upload/form', postData, function(data, textStatus, xhr) {
            //console.log(data);
            if (data == 'success') {
                uploadAvatar();
            } else {
                myAlert("信息表上传出错了><，请重试");
                $('#result').text('信息表上传出错了');
            }
        });
    }

    checkValid();
}


function previewImage(file) {
    //console.log(file.files.item(0));
    if (file.files.item(0).size > 10485760) {
        myAlert('这个图有点大。。。');
        return false;
    }
    switch (file.files.item(0).type) {
        case 'image/pjpeg':
            ;
        case 'image/jpeg':
            ;
        case 'image/png':
            ;
        case 'image/x-png':
            ;
        case 'image/gif':
            break;
        default:
            myAlert('这个是图吗。。。');
            return false;
    }
    var MAXWIDTH = 128;
    var MAXHEIGHT = 128;
    var div = document.querySelector('#preview');
    if (file.files && file.files[0]) {
        div.innerHTML = '<img id=imghead>';
        var img = document.querySelector('#imghead');
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
        var img = document.querySelector('#imghead');
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

function checkApply(file) {
    //console.log(file.files.item(0).type);
    if (file.files.item(0).size > 104857600) {
        myAlert('这东西好大啊。。。');
        return false;
    } 
}

function uploadAvatar() {
    $('#result').text('正在上传照片');
    var fileObj = document.querySelector('#avatarFile').files[0];
    var fileController = "/joinsdi/upload/avatar";

    var form = new FormData();
    form.append('file', fileObj);

    var xhr = new XMLHttpRequest();

    xhr.open("post", fileController, true);
    xhr.onload = function() {
        if (this.responseText == 'success') {
            uploadApply();
        } else {
            myAlert('照片上传出错了><，请重试');
            $('#result').text('照片上传出错了');
        }
    }
    xhr.upload.addEventListener('progress', progressFunction, false);
    xhr.send(form);
}

function uploadApply() {
    $('#result').text('正在上传报名表');
    var fileObj = document.querySelector('#applyFile').files[0];
    var fileController = "/joinsdi/upload/apply";

    var form = new FormData();
    form.append('file', fileObj);

    var xhr = new XMLHttpRequest();

    xhr.open("post", fileController, true);
    //xhr.setRequestHeader("Content-Type","multipart/form-data");
    xhr.onload = function() {
        //console.log(this.responseText);
        if (this.responseText == 'success') {
            myAlert('<p>上传成功</p><p>我们已经向你所填写的邮箱发送了确认邮件，请注意查收');
            $('#result').text('上传成功');
            window.uploaded = 1;
        } else {
            myAlert('报名表上传出错了><，请重试');
            $('#result').text('报名表上传出错了');
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
        }, 6000);
    });
    $('#myAlert').html(text);
    $('#myAlert').click(function() {
        $('#myAlert').fadeOut();
    });
}

function check(id) {
    //console.log($('[name=date' + id + ']'))
    var target = $('[name=date' + id + ']');
    if (target.attr('checked')) {
        target.removeAttr('checked');
    } else {
        target.attr('checked', 'checked');
    };
}
