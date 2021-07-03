

handleJsonp = (data) => {
    if (data && data.ssid && !localStorage.bookSsid.includes(data.ssid + ',')) {
        localStorage.bookSsid += data.ssid + ',';
    }
}

if (typeof localStorage.bookSsid === 'undefined')
    localStorage.bookSsid = '';

if (location.href.includes('/views/specific/')) {
    setTimeout(pick, 1000);
} else if (location.href.includes('/search')) {
    setTimeout(batchUpload, 1000);
}

async function batchUpload() {
    let $img = $('td[id="b_img"]');
    for (let i = 0; i < $img.length; i++) {
        let ssid = $img.eq(i).parent('tr').find('input[name*="ssid"]').val();
        if (ssid) {
            let url = $img.eq(i).find('a[href^="/views/specific/"]').attr('href');
            if (url) {
               try{
				   await pick(location.origin+url, ssid);
			   }catch(e){
				   //console.log(e);
			   }
            }
        }
    }
}

async function pick(url, ssid) {
    let obj = await getBookInfo(url, ssid);
    if (!obj)
        return;
    return $.ajax({
        url: 'http://106.54.95.178:8200/?' + urlEncode(obj),
        dataType: 'jsonp',
        jsonpCallback: 'handleJsonp'
    })
}

function getInfoArea(url) {
    return fetch(url).then(r => r.text()).then(text => {
        let index = text.indexOf('<div class="leftnav_tu">');
        if (index > -1) {
            return $(text.substr(index, 28000)).filter('div.leftnav_tu');
        }
        return null;
    });
}

async function getBookInfo(url, ssid) {
    let $area;
    if (url) {
        if (localStorage.bookSsid.includes(ssid + ',')) {
            return null;
        }
        $area = await getInfoArea(url);
        if (!$area||!$area.length===0)
            return null;
    } else {
        $area = document.body;
        url = location.href;
        ssid = $('script:contains(send_requestajax)').text().match(/ssn=(\d{3,})/);

        if (!ssid)
            return;
        ssid = ssid[1];

        if (localStorage.bookSsid.includes(ssid + ',')) {
            return null;
        }
    }

    let obj = {};
    obj.ssid = ssid;
    let $dd = $('div.tubox>dl>dd', $area);
    let ssn = url.match(/dxNumber=(\d+)/);
    if (ssn)
        obj.ssn = ssn[1];
    obj.name = $('div.tutilte', $area).text().trim();
    obj.pic = $('div.tubookimg>img', $area).attr('src');
    for (let i = 0; i < $dd.length; i++) {
        let m,
        t = $dd.eq(i).text().trim().replace(/['"]/g, m => `\\` + m);
        if (m = t.match(/【作　者】\s*(.+)/)) {
            obj.author = m[1].trim();
        } else if (m = t.match(/【形态项】\s*(.+)/)) {
            obj.category = m[1].trim();
        } else if (m = t.match(/【出版项】\s*(.+)/)) {
            obj.public = m[1].trim();
        } else if (m = t.match(/【ISBN号】\s*([0-9\-]+)/)) {
            obj.isbn = m[1].trim();
        } else if (m = t.match(/【丛书名】\s*(.+)/)) {
            obj.series = m[1].trim();
        }
    }
    return obj;
}

function urlEncode(obj) {
    return Array.isArray(obj) ? obj.map(o => urlEncode(o)).join('&') : Object.keys(obj).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])).join('&');
}