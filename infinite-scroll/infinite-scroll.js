const listWrapperEl = document.querySelector(".scroll-block-wrapper");
listWrapperEl.style.height = window.innerHeight - 44 + 'px';
var count = 21;

listWrapperEl.addEventListener("scroll",function () {
    const listWrapper = document.querySelector(".scroll-wrapper");
    const listWrapperul = document.querySelector(".scroll-list");
    const diff = listWrapper.clientHeight - listWrapperEl.clientHeight;
    if(listWrapperEl.scrollTop + 1 > diff){
        const preload = document.querySelector(".preload-text");
        preload.style.display = 'block';
        setTimeout(function () {
            preload.style.display = 'none';
            for(var i=0;i<5;i++){
                var listWrapperitem = document.createElement("li");
                listWrapperitem.className = "scroll-list-item";
                listWrapperitem.innerHTML = "<p>item "+count+"</p>";
                listWrapperul.appendChild(listWrapperitem);
                count++;
            }
        },2000)
    }
})