/**
 * Created by SP0015 on 2017/12/25.
 */
define(function(){
    return SetIndexRender;
});
var SetIndexRender = {
    Render: function () {
        //    Todo Main function
        //页面加载初始化默认显示权限设置页面
        $('#messageList').loadPage($("#navList ul li a").eq(0).attr('attr-href'));
        //导航切换
        $('#navList ul li').on('click',function () {
            var $this = $(this);
            $('#navList li').removeClass('activeLi');
            $this.addClass('activeLi');
            $('#messageList').loadPage($this.find('a').attr('attr-href'));
            //切换图片背景
           $('#navList li img').each(function (item) {
              /* var _thisName = this.src.split('/')
               var srcName = _thisName[_thisName.length-1]
               _thisName.pop();
                var newSrc = srcName.replace(/2/, "1")
               _thisName.push(newSrc)
               this.src = _thisName.join('/')*/

               $(this).attr('src',replaceImg(this.src,/2/, "1"))
            });
            var imgSrc = $this.find("img").attr('src');
            // var newImgSrc = imgSrc.replace(/1/, "2")
            // $this.find('img').attr('src',newImgSrc)

            $this.find('img').attr('src',replaceImg(imgSrc,/1/,"2"))
        });

        function replaceImg(src,reg,rep) {

            var _thisName = src.split('/');
            var srcName = _thisName[_thisName.length-1];
            _thisName.pop();
            var newSrc = srcName.replace(reg, rep);
            _thisName.push(newSrc);
            return _thisName.join('/')
        }
    },
};
