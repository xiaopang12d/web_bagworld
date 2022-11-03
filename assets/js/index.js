$(function() {
    getUserInfo()
})
var layer = layui.layer

function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'get',
        success: function(res) {
            if (res.status != 0) {
                return layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data)
        },


    })
}

$('#btnLogoout').on('click', function() {
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
        localStorage.removeItem('token');
        location.href = './login.html'

        layer.close(index);
    });
})

function renderAvatar(user) {
    let name = user.nickname || user.username;
    $('#welcome').html(`欢迎&nbsp;&nbsp;${name}`);
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avata').hide();
    } else {
        $('.layui-nav-img').hide();
        let first = name[0].toUpperCase();
        $('.text-avata').html(first).show();
    }
}