/*导出Excel 带图片*/
function getExplorer() {

    var explorer = window.navigator.userAgent;
    if (explorer.indexOf("MSIE") >= 0) {
        return 'ie';
    } else if (explorer.indexOf("Firefox") >= 0) {
        return 'Firefox';
    } else if (explorer.indexOf("Chrome") >= 0) {
        return 'Chrome';
    } else if (explorer.indexOf("Opera") >= 0) {
        return 'Opera';
    } else if (explorer.indexOf("Safari") >= 0) {
        return 'Safari';
    }
}

// 非ie浏览器下执行
const tableToNotIE = (function () {
    // 编码要用utf-8不然默认gbk会出现中文乱码
    let uri = 'data:application/vnd.ms-excel;base64,',
    template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table width="60%" border="1">{table}</table></body></html>',
    base64 = function (s) {
        return window.btoa(unescape(encodeURIComponent(s)));

    },

    format = (s, c) => {
        return s.replace(/{(\w+)}/g,
            (m, p) => {
            return c[p];
        })
    }
    return (table, name) => {
        let ctx = {
            worksheet: name,
            table
        }

        if (navigator.userAgent.indexOf("Firefox") > -1) {
            window.location.href = uri + base64(format(template, ctx))
        } else {
            //创建下载
            let link = document.createElement('a');
            link.setAttribute('href', uri + base64(format(template, ctx)));

            link.setAttribute('download', name);

            // window.location.href = uri + base64(format(template, ctx))
            link.click();
        }
    }
})()

// 导出函数
const export2Excel = (theadData, tbodyData, dataname) => {

    let re = /http.+\.(jpg|jpeg|png|gif)($|\?)/// 字符串中包含http,则默认为图片地址
        let th_len = theadData.length // 表头的长度
        let tb_len = tbodyData.length // 记录条数
        let width = 30// 设置图片大小
        let height = 30
        // 添加表头信息
        let thead = '<thead><tr>'
        for (let i = 0; i < th_len; i++) {
            thead += '<th>' + theadData[i] + '</th>'
        }
        thead += '</tr></thead>'

        // 添加每一行数据
        let tbody = '<tbody>'
        for (let i = 0; i < tb_len; i++) {
            tbody += '<tr>'
            let row = tbodyData[i]// 获取每一行数据

                for (let key in row) {
                    if (re.test(row[key])) { // 如果为图片，则需要加div包住图片
                        //
                        tbody += '<td style="width:' + width + 'px; height:' + height + 'px; text-align: center; vertical-align: middle"><div style="display:inline"><img src=\'' + row[key] + '\' ' + ' ' + 'width=' + '\"' + width + '\"' + ' ' + 'height=' + '\"' + height + '\"' + '></div></td>'
                    } else {
                        tbody += '<td style="text-align:center">' + row[key] + '</td>'
                    }
                }
                tbody += '</tr>'
        }
        tbody += '</tbody>'

        let table = thead + tbody

        // 导出表格
        tableToNotIE(table, dataname)
}
