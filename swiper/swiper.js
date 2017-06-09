/**
 * Created by luowendi on 2017/6/8.
 */
var container = document.getElementById("index-banner")
var list = document.getElementById("list");
var button = document.getElementById("button").getElementsByTagName("span");
var prev = document.getElementById("prev");
var next = document.getElementById("next");
var index = 1;
var animated = false;
var timer;
var img = list.getElementsByTagName("img")[0];
var imgwidth = parseInt(img.offsetWidth);

function showButton(){
    for(var i =0;i<button.length;i++){
        if(button[i].className =="on"){
            button[i].className ="";
            break;
        }
    }
    button[index-1].className = 'on'
}
var animate = function (offset) {
    animated = true;
    var newleft = parseInt(list.style.left)+offset;
    var time = 500;
    var interval = 10;
    var speed = offset/(time/interval);
    function go() {
        if((speed >0 && parseInt(list.style.left) < newleft) || (speed < 0 && parseInt(list.style.left) > newleft)){
            list.style.left = parseInt(list.style.left)+speed+'px';
            setTimeout(go,interval);
        }else{
            animated = false;
            list.style.left = newleft + 'px';
            if(newleft < -5000){
                list.style.left = -1000 + 'px';
            }else if(newleft > -1000){
                list.style.left = -5000 + 'px'
            }
        }
    }
    go();
}
next.onclick = function () {
    if(!animated) {
        if (index == 5) {
            index = 1;
        } else {
            index++;
        }
        animate(-imgwidth);
        showButton();
    }
};
prev.onclick = function () {

    if(!animated) {
        if (index == 1) {
            index = 5;
        } else {
            index--;
        }
        animate(imgwidth);
        showButton();
    }
};
function play() {
    timer = setInterval(function () {
        next.onclick();
    },4000)
}
function stop() {
    clearInterval(timer);
}
for(var i=0;i<button.length;i++){
    button[i].onmouseover = function () {
        if(this.className == 'on'){
            return;
        }
        var curindex = parseInt(this.getAttribute('index'));
        var offset = -imgwidth*(curindex - index);
        if(!animated) {
            animate(offset);
            index = curindex;
            showButton();
        }
    }
}

container.onmouseover = stop;
container.onmouseout = play;
play();