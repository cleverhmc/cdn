javascript: (()=> {
    var temp = (location.href + '&').match(/id=(.{8,14})&/);
    if (temp && temp[1] && (location.href.indexOf('https://detail.tmall.com/item.htm') >= 0 || location.href.indexOf('https://item.taobao.com/item.htm') >= 0)) {
        window.open('https://item.manager.tmall.com/tmall/manager/render.htm?from=bm&pagination.current=1&pagination.pageSize=20#queryItemId=' + temp[1]);
    } else {
        Toast('请在淘宝商品详情页打开');
    }
})();
