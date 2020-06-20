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
                document.body.removeChild(m)
            }, d * 1000);
        }, duration);
    };
    function copyToClip(content, message) {
        var aux = document.createElement('input');
        aux.setAttribute('value', content);
        document.body.appendChild(aux);
        aux.select();
        document.execCommand('copy');
        document.body.removeChild(aux);
        if (message == null) {
            Toast('%E5%A4%8D%E5%88%B6%E6%88%90%E5%8A%9F%EF%BC%9A' + content);
        } else {
            Toast(message);
        }
    };
    var title,
    address,
    name,
    buyprice,
    buyaccount;
    if (location.href.indexOf('https://trade.taobao.com/trade/detail/trade_order_detail.htm') >= 0) {
        title = document.querySelector('div.name>[href^="//trade.taobao.com/trade/detail/"]').innerText;
        address = document.querySelector('div>dl:first-child>dd').innerText;
        name = address.substring(0, address.indexOf('%EF%BC%8C'));
        buyprice = document.querySelector('div>span>strong').innerText.replace('%EF%BF%A5', '');
        buyaccount = document.querySelector('ul>li>div.menu-hd>a').innerText;
    } else if (location.href.indexOf('https://trade.tmall.com/detail/orderDetail.htm') >= 0) {
        title = document.querySelector('div.item-meta>[href^="//trade.taobao.com/trade/detail/"]').innerText;
        address = document.querySelector('ul>li:first-of-type>div.trade-imfor-dd>span.ui-trade-label').innerText;
        name = address.substring(0, address.indexOf(','));
        buyprice = document.querySelectorAll('div.mixture-cell>div.mixture-cell>span.ui-trade-label ');
        buyprice = buyprice[buyprice.length - 1].innerText.replace('%EF%BF%A5', '');
        buyaccount = document.querySelector('p#login-info>span.sn-welcome-info>a.j_Username.j_UserNick.sn-user-nick').innerText;
    } else {
        Toast('%E8%AF%B7%E5%9C%A8%E6%8B%8D%E5%8D%95%E4%BA%A4%E6%98%93%E8%AF%A6%E6%83%85%E9%A1%B5%E8%BF%9B%E8%A1%8C%E5%A4%8D%E5%88%B6');
        return;
    }
    var sellprice = document.querySelector('div.buyer-address>div>p.memo');
    sellprice = sellprice ? sellprice.innerText.match(/%E4%B9%B0%E5%AE%B6%E5%AE%9E%E4%BB%98%E6%AC%BE%EF%BC%9A(.+) /)[1] : '';
    copyToClip(title + '%09' + name + '%09' + buyprice + '%09%09' + sellprice + '%09%09%09' + buyaccount);
})();
