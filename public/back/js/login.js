$(function(){
  $("#form").bootstrapValidator({
      feedbackIcons:{
        valid: 'glyphicon glyphicon-ok',    // 校验成功
      invalid: 'glyphicon glyphicon-remove',  // 校验失败
      validating: 'glyphicon glyphicon-refresh' // 校验中
      },
      //配置字段
      fields:{
        username:{
          //配置校验规则
          validators:{
            //非空
            notEmpty:{
              message:"用户名不能为空"
            },
            //长度校验
            stringLength:{
              min:2,
              max:6,
              message:"用户名长度必须在2-6位"
            },
            //专门用于配置回调提示的规则
            callback:{
              message:"用户名不存在"
            }
          }
        },
        password:{
          validators:{
            notEmpty:{
              message:"密码不能为空"
            },
            stringLength:{
              min:6,
              max:12,
              message:"密码长度必须是6-12位"
            },
            callback:{
              message:"密码错误"
            }
          }
        }
      }
  })

  // 登录功能
  // 表单校验插件会在提交表单时进行校验
  //（1）校验成功，默认提交表单 会发生页面跳转，需要注册表单校验成功事件
  //（2）校验失败，不提交表单 配置插件提示用户即可

  // 注册表单校验成功事件
  $('#form').on("success.form.bv",function(e){
    // 阻止默认的表单提交
    e.preventDefault();
    // 通过ajax进行提交
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$('#form').serialize(),
      dataType:"json",
      success:function(info){
        console.log(info);
        if(info.success){
          location.href = "index.html";
        }

         // updateStatus (1,2,3)更新校验状态(三个参数)
          // 1. 字段名称
          // 2. 校验状态  VALID 有效验证, INVALID无效验证   NOT_VALIDATED未校验的,  VALIDATING校验中的
          // 3. 校验规则, 用于指定提示文本
        if(info.error === 1000){
          // 当错误1000时  当前用户名不存在，需要调用表单插件里的内置方法
          $('#form').data("bootstrapValidator").updateStatus("username","INVALID","callback");
        }
        if(info.error === 1001){
        $('#form').data("bootstrapValidator").updateStatus("password","INVALID","callback");
        }
      }
    })
  });


  // 重置功能
  $('[type = "reset"]').click(function(){
    // 调用插件方法，进行重置校验状态
    //在resetForm（boolean）
    // 若传true，重置内容 以及校验状态
    // 若传false，只重置校验状态
    $('#form').data("bootstrapValidator").resetForm();
  })




})