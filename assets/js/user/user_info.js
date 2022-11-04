$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！';
            }
        }

    })
    initUserInfo();

    //获取表单
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('用户获取信息失败!')
                }
                form.val('formUserInfo', res.data)
            }
        })
    }
    //阻止清空表单元素
    $('#btnReset').on('click', function(e) {
            e.preventDefault();
            initUserInfo();
        })
        //获取新的表单元素
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            // data: $(this).serialize(),
            data: form.val('formUserInfo'),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                window.parent.getUserInfo();
            }
        })
    })
})