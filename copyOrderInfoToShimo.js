javascript: (function () {
    var title,
    address,
    name,
    buyprice,
    buyaccount;
    if (location.href.indexOf('https://trade.taobao.com/trade/detail/trade_order_detail.htm') >= 0) {
        title = document.querySelector('div.name>[href^="//trade.taobao.com/trade/detail/"]').innerText;
        address = document.querySelector('div>dl:first-child>dd').innerText;
        name = address.substring(0, address.indexOf('，'));
        buyprice = document.querySelector('div>span>strong').innerText.replace('￥', '');
        buyaccount = document.querySelector('ul>li>div.menu-hd>a').innerText;
    } else if (location.href.indexOf('https://trade.tmall.com/detail/orderDetail.htm') >= 0) {
        title = document.querySelector('div.item-meta>[href^="//trade.taobao.com/trade/detail/"]').innerText;
        address = document.querySelector('ul>li:first-of-type>div.trade-imfor-dd>span.ui-trade-label').innerText;
        name = address.substring(0, address.indexOf(','));
        buyprice = document.querySelectorAll('div.mixture-cell>div.mixture-cell>span.ui-trade-label ');
        buyprice = buyprice[buyprice.length - 1].innerText.replace('￥', '');
        buyaccount = document.querySelector('p#login-info>span.sn-welcome-info>a.j_Username.j_UserNick.sn-user-nick').innerText;
    } else {
        Toast('请在拍单交易详情页进行复制');
        return;
    }
    var sellprice = document.querySelector('div.buyer-address>div>p.memo');
    sellprice = sellprice ? sellprice.innerText.match(/买家实付款：(.+) /)[1] : '';
    copyToClip(title + '\t' + name + '\t' + buyprice + '\t\t' + sellprice + '\t\t\t' + buyaccount);
})();
