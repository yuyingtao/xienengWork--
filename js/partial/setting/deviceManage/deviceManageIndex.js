/**
 * Created by SP0014 on 2018/1/10.
 * 设备管理
 */
define(function(){
    return deviceManageIndex;
});
var deviceManageIndex = {
    Render: function () {
        //    Todo Main function
        //页面加载初始化默认显示设备管理页面
        //导航切换
        $('#navList1 ul li').on('click',function () {
            var $this = $(this);
            $('#navList1 li').removeClass('activeLi');
            $this.addClass('activeLi');
            $('#messageList').loadPage($this.find('a').attr('attr-href'));
            //切换图片背景
            $('#navList1 li img').each(function (item) {
                $(this).attr('src',replaceImg(this.src,/2/, "1"))
            });
            var imgSrc = $this.find("img").attr('src');
            $this.find('img').attr('src',replaceImg(imgSrc,/1/,"2"))
        });
        $('#navList1 ul li').eq(0).click();
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