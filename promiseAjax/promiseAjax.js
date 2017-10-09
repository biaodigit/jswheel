function ajax(opt) {
    return new Promise((resolve, reject) => {
        let xhr;
        if (XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }

        let data = opt.data,
            url = opt.url,
            type = opt.type.toUpperCase(),
            dataArr = [];

        for (let k in data) {
            dataArr.push(`${k}=${data[k]}`)
        }

        if (type === 'GET') {
            if (url.indexOf('?') > -1) {
                url = `${url}&${dataArr.join('&')}`
            } else {
                url = `${url}?${dataArr.join('&')}`
            }

            xhr.open(type, url, true);
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xhr.send()
        } else if (type === 'POST') {
            xhr.open(type, url, true);
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xhr.send(JSON.stringify(data))
        }
        
        xhr.onreadystatechange = function () {
            let res;
            if(xhr.status === 200 || xhr.status === 304){
                res = xhr.responseText
                if(typeof res === 'string'){
                    res = JSON.parse(res)
                    resolve(res)
                }
            }else{
                reject(xhr.statusText)
            }
        }
    })
}