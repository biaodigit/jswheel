/**
 * Created by luowendi on 2017/6/8.
 */
var panel = document.getElementById("panel-body")
var item = panel.getElementsByTagName("a");

for(var i=0;i<item.length;i++){
    item[i].onmouseover = function () {
        move(this,-50)
    }
    item[i].onmouseout = function () {
        move(this,0);
    }
}
function move(obj,iTarget) {
    clearInterval(obj.timer)
    obj.timer = setInterval(function () {
        var speed = (iTarget - obj.offsetTop)/5;
        speed = speed > 0?Math.ceil(speed):Math.floor(speed);
        if(obj.offsetTop == iTarget){
            clearInterval(obj.timer)
        }else{
            obj.style.top = obj.offsetTop + speed + 'px';
        }
    },40)
}