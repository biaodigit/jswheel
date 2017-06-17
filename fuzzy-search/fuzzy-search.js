/**
 * Created by di on 2017/6/17.
 */
let btn = document.querySelector("button");
let arr = ['哈哈哈哈蜜瓜', '哈哈哈', '啦啦啦', 'lalla'];

let search = {
    text: function () {
        return document.querySelector('input').value;
    },
    searchValue: function () {
        let reg = new RegExp(this.text());
        let list = document.getElementById("list");
        list.innerHTML = '';
        let search = false;
        list.style.display = 'block';
        for (let i = 0; i < arr.length; i++) {
            if (reg.test(arr[i])) {
                let ali = document.createElement("li");
                ali.innerHTML = arr[i].replace(reg,"<span class='searchtxt'>"+reg.exec(this.text())+"</span>");
                list.appendChild(ali);
                search = true;
            }
        }
        if (!search) {
            let ali = document.createElement("li");
            ali.innerHTML = '暂无查询结果';
            list.appendChild(ali);
        }

    }
}

btn.addEventListener("click", function () {
    search.searchValue();
})