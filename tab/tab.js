/**
 * Created by di on 2017/6/7.
 */
var tabtit = document.querySelector(".tab-tit").querySelectorAll("li");
var tabdiv = document.querySelector(".tab-panel").querySelectorAll("ul");
console.log(tabdiv.length)
var index = 0;
var timer;
for(var i=0;i<tabtit.length;i++){
   tabtit[i].index = i;
   tabtit[i].onmouseover = function () {
       clearInterval(timer);
       animate(this.index);
   }
   tabtit[i].onmouseout = function () {
       timer = setInterval(autoPlay,2000)
   }
}

var autoPlay = function () {
    index++;
    if(index == 5){
        index = 0;
    }
    animate(index);
}

timer = setInterval(autoPlay,2000);

var animate = function (currIndex) {
    for(var i=0;i<tabtit.length;i++){
        tabtit[i].className = "";
        tabdiv[i].style.display = "none";
    }
    tabtit[currIndex].className = 'select';
    tabdiv[currIndex].style.display = 'block';
    index = currIndex;
}