$(function() {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })


    // 从 layui 中获取 form 对象
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            let pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }

    })

    //监听注册表单提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        let data = $(this).serialize()
            // username: $('#form_reg [name=username]').val(),
            // password: $('#form_reg [name=password]').val()
        console.log(data);
        //  }
        $.post('/api/reguser', data,
            function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功！', {
                    icon: 1,
                    time: 2000
                }, function() {
                    $('#link_login').click();
                });
            }
        );

    })

    //监听登录事件
    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'post',
            data: $('#form_login').serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功', function() {
                    localStorage.setItem('token', res.token);
                    location.href = "/bagworld/index.html";
                })
            }
        })

    })
})