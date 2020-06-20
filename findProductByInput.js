javascript: (function () {
    var p = prompt('请输入淘宝商品ID(xxxxxxxx 、TB_xxxxxxx)或标题', '');
    if (!p)
        return;
    p = p.trim();
    var mResult = p.match(/(?:[Tt][Bb]_)?(\d{10,14}$)/);
    if (mResult && mResult[1]) {
        window.open("https://item.taobao.com/item.htm?id=" + encodeURIComponent(mResult[1]));
    } else {
        window.open("https://s.taobao.com/search?q=" + encodeURIComponent(p));
    }
})();