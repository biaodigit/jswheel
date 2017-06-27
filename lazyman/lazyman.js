/**
 * Created by di on 2017/6/27.
 */
let Human = function (_name) {
    return new human(_name)
}
let human = function (people) {
    this.tasks = [];
    this.people = people;
    let self = this;
    let fn = function () {
        console.log('你好' + people + '!');
        self.next()
    }
    this.tasks.push(fn);
    setTimeout(function () {
        self.next();
    }, 0)
}
human.prototype.next = function () {
    if (this.tasks.length == 0) {
        return;
    }
    let fn = this.tasks.shift();
    fn();
}
human.prototype.sleep = function (time) {
    let self = this;
    let fn = function () {
        setTimeout(function () {
            console.log(self.people + '休息' + time + '秒');
            self.next();
        }, time * 1000)
    }
    this.tasks.push(fn);
    return this;
}
human.prototype.eat = function (food) {
    let self = this;
    let fn = function () {
        console.log(self.people + '吃了' + food);
        self.next();
    }
    this.tasks.push(fn);
    return this;
}
human.prototype.sleepFirst = function (time) {
    let self = this;
    let fn = function () {
        setTimeout(function () {
            console.log(self.people + '开始等待' + time + '秒');
            self.next();
        },time*1000);
    }
    this.tasks.unshift(fn);
    return this;
}
Human('小明').sleep(2).eat('早餐').sleep(1).sleepFirst(1);