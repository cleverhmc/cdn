javascript: (function () {
    Toast = function (msg, duration) {
        duration = isNaN(duration) ? 4000 : duration;
        var m = document.createElement('div');
        m.innerHTML = msg;
        m.style.cssText = 'max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;';
        document.body.appendChild(m);
        setTimeout(function () {
            var d = 0.5;
            m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
            m.style.opacity = '0';
            setTimeout(function () {
                document.body.removeChild(m);
            }, d * 1000);
        }, duration);
    };
    var temp = (location.href + '&').match(/id=(.{8,14})&/);
    console.log(temp);
    if (temp && temp[1] && (location.href.indexOf('https://detail.tmall.com/item.htm') >= 0 || location.href.indexOf('https://item.taobao.com/item.htm') >= 0)) {
        window.open('https://item.manager.tmall.com/tmall/manager/render.htm?from=bm&pagination.current=1&pagination.pageSize=20#queryItemId=' + temp[1]);
    } else {
        Toast('请在淘宝商品详情页打开');
    }
})();
