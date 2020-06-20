javascript: (function () {
    var p = prompt('%E8%AF%B7%E8%BE%93%E5%85%A5%E6%B7%98%E5%AE%9D%E5%95%86%E5%93%81ID(xxxxxxxx%E3%80%81TB_xxxxxxx)%E6%88%96%E6%A0%87%E9%A2%98%E5%85%B3%E9%94%AE%E5%AD%97','');
	Toast('toast');
    if (!p)
        return;
    p = p.trim();
	var mResult=p.match(/[tb|TB|Tb]_(\d{10,14}$)/);
    if (mResult&&mResult[1]) {
        window.open("https://item.taobao.com/item.htm?id=" + encodeURIComponent(mResult[1]));
    } else {
        window.open("https://s.taobao.com/search?q=" + encodeURIComponent(p));
    }
})();
