$(function() {
    getUserInfo();
    $('#btnLogoout').on('click', function() {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token');
            location.href = './login.html'

            layer.close(index);
        });
    })
})
var layer = layui.layer

//获取用户的基本信息
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



//判断是图片还是文本
function renderAvatar(user) {
    let name = user.nickname || user.username;
    $('#welcome').html(`欢迎&nbsp;&nbsp;${name}`);
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        let first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}