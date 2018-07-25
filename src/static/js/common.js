layui.config({
    base: './static/js/modules/'
}).extend({
    api: 'api/api',
    srbank: 'api/srbank',
//  home: '{/}./static/js/product/home'
});

layui.use(['jquery', 'layer'], function() {
    var $ = layui.jquery;
    var layer = layui.layer;

    // 初始化
    init({
        // 侧边栏导航
        $asideHoverEles: $('.js-aside_hover'),
        asideHoverClass: 'aside-item-hover',
        asideHoverTextEle: '.aside-text',
        asideHoverLeftWidth: '34px',
        asideHoverWidth: '-60px',
        $scrollTopEle: $('#back_top'),
        $onlineServer: $('.js-online_server')
    });

    function init(options) {
        // 侧边导航栏hover效果
        options.$asideHoverEles.hover(function() {
            asideAnimate($(this), options.asideHoverClass, options.asideHoverTextEle, options.asideHoverWidth);
        }, function() {
            asideAnimate($(this), options.asideHoverClass, options.asideHoverTextEle, options.asideHoverLeftWidth);
        });

        // 返回顶部按钮显示
        $(window).scroll(function() {
            if ($(window).scrollTop() > 250) {
                options.$scrollTopEle.fadeIn(300);
            } else {
                options.$scrollTopEle.fadeOut(300);
            }
        });

        // 返回底部
        options.$scrollTopEle.on('click', function(e) {
            e.preventDefault();

            scrollTop(1000);
        });

        // 在线客服
        options.$onlineServer.on('click', function(e) {
            e.preventDefault();

            onlineServer();
        });
    }

    /*
     * 侧边栏弹出效果
     * @param {object} hoverEle: 需要移动的元素
     * @param {string} addHoverClass: 添加的样式
     * @param {string} hoverEleClass: 移动的元素
     * @param {string} hoverLeft: 移动的距离
     */
    function asideAnimate(hoverEle, addHoverClass, hoverEleClass, hoverLeft) {
        if (!hoverEle.hasClass(addHoverClass)) {
            hoverEle.addClass(addHoverClass).find(hoverEleClass).animate({
                'left': hoverLeft
            });
        } else {
            hoverEle.removeClass(addHoverClass).find(hoverEleClass).animate({
                'left': hoverLeft
            });
        }
    }

    /*
     * 回到顶部
     * @param {string} scrollTime: 回到顶部所需的时间
     */
    function scrollTop(scrollTime) {
        $('body, html').animate({
            scrollTop: 0
        }, scrollTime);
    }

    /*
     * 在线客服弹窗
     */
    function onlineServer() {
//      window.open('/about/online_service', '_bank', 'toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=400, height=400,left=500px,top=200px');
        layer.open({
            type: 2,
            content: ['/about/online_service', 'no'],
            title: '在线客服',
            area: ['400px', '400px'],
            maxmin: true
        });
    }


});