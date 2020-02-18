$ (document).ready( function(){
    var viewIndex = 0;
    $("a[herf='#']").click(function (e){
        e.preventDefault();
        return false;
    })

    $('.nav a').click(function(e){ 
            const winH= $(window).height();
            //获取自定义属性
            let target = $(this).attr('data-index');
            let fanalH = winH*target;
            var name = $(this).attr('section-name');
            
            
            viewScroll('body,html',fanalH,target*1);
           
            viewIndex = target;
            if(name){
                $(name).find('.fade').addClass('fade-in');
            }
            e.preventDefault();
            return false;
        })  
        //点击切换按钮  
        $('.scroll-tip').click(function () {
            let index=$(this).attr('data-index')
            let winH = $(window).height();
            var name = $(this).attr('next-name');
           
            
            
            if(index < 5){
                
                viewScroll('body,html',winH*index,true);
                ++ viewIndex
                if(name){
                    $(name).find('.fade').addClass('fade-in');
                }
               
            }else{
                viewScroll('body,html',0,false,0);
                viewIndex = 0;
                $('.fade').removeClass('fade-in');
            }        
         })
         
        function viewScroll(el,height,fixed) {
            fixedNav(fixed);
            $(el).animate({
                scrollTop:height
            },600,function(){
            })

        }
        function fixedNav(flag) {
            if(flag) {
              $('.section-header .nav').addClass('fixed');
            }else {
              $('.section-header .nav').removeClass('fixed');
            }
          }

         
         window.onscroll = throttleFn(function(){
                console.log(123);
                
         },50);
         //节流函数
         function throttleFn(fn, delay) {
            var timer = null;
            return function () {
              var that = this, args = arguments;
              clearTimeout(timer);
              timer = setTimeout(function () {
                fn.apply(that, args)
              }, delay)
            }
          }
         $(document).on('mousewheel DOMMouseScroll', function(e) {
            // 保存js原生事件的参数
            var e0 = e.originalEvent,
            // 根据值的正负判断滚动的方向
            detail = e0.wheelDelta,
            isScrollDown = detail < 0 ? true : false;
            var height = 0;
            var winH = $(window).height();
            var fixed = true;
            // viewIndex的取值范围是0-4
            if(isScrollDown) {
              fixed = true;
              ++ viewIndex ;
             
              } else {
              
              -- viewIndex;
              if (viewIndex > 1) {
              fixed = true;
            
              }else {
              fixed = false;
            
              }
              }
              height = winH * viewIndex;
              viewScroll('html', height, fixed);
          })

})
