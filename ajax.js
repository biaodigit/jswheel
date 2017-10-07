/**
 * Created by luowendi on 2017/6/5.
 */
function ajax(opt) {
    return new Promise(function (resolve, reject) {
        let opt = {
                url: '',
                type: 'get',
                data: {}
            },
            xhr;
        if (XMLHttpRequest) {
            xhr = XMLHttpRequest;
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }
        let data = opt.data,
            url = opt.url,
            type = opt.type.toUpperCase(),
            dataArr = [];
        for (let k in data) {
            dataArr.push(k + '=' + data[k])
        }
        if (type === 'GET') {
            url = url + '?' + dataArr.join('&')
            xhr.open(type, url.replace(/\?$/g, ''), true);
            xhr.send();
        } else {
            xhr.open(type, url, async);
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xhr.send(dataArr.join('&'));
        }
        xhr.onreadystatechange = function () {
            let res;
            if (xhr.status === 200 || xhr.status === 304) {
                res = xhr.responseText
                if (typeof res === 'string') {
                    res = JSON.parse(res)
                    resolve(res)
                }
            }else {
                reject(xhr.statusText)
            }
        };
    })
}