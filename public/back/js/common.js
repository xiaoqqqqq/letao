// 进度条
// 实现在第一个ajax发送的时候，开启进度条
// 在所有ajax请求都完成时关闭进度条
  
 // ajax全局事件
// 1. ajaxComplete 当每个 ajax 请求完成的时候, 调用 (不管成功还是失败都调用)
// 2. ajaxError    当 ajax 请求失败的时候, 调用
// 3. ajaxSuccess  当 ajax 请求成功的时候, 调用
// 4. ajaxSend     在每个 ajax 请求发送前, 调用
// 5. ajaxStart    在第一个 ajax 发送时, 调用
// 6. ajaxStop     在所有的 ajax 请求完成时, 调用

 $(document).ajaxStart(function(){
   NProgress.start();
 })
 $(document).ajaxStop(function(){
   NProgress.done();
 })

 // 登录拦截功能
 // 发送ajax请求 ，查询用户状态
 // （1）用户已登录，让用户继续访问
 // （2）用户未登录，拦截到登录页
 if(location.href.indexOf("login.html")=== -1){
    //地址栏中没有login.html 说明不是登录页，需要进行登录拦截
    $.ajax({
      type:"get",
      url:"/employee/checkRootLogin",
      dataType:"json",
      success:function(info){
        if(info.success){

        }
        if(info.error === 400){
          location.href = "login.html";
        }
      }
    })
 }