let Human = (name) => {
    if(!name || typeof name !== 'string'){
        return
    }

    return new human(name)
}


class human {
    constructor(name) {
        this.people = name;
        this.tasks = [];

        let fn = () => {
            console.log(`你好${name}`);
            this.next()
        }
        this.tasks.push(fn);

        setTimeout(() => {
            this.next()
        },0)
    }

    next() {
        if(this.tasks.length === 0){
            return;
        }

        var fn = this.tasks.shift();
        fn()
    }

    sleep(time) {
        let fn = () => {
            setTimeout(() => {
                console.log(`${this.people}休息了${time}秒`);
                this.next()
            },time*1000)
        }
        this.tasks.push(fn)
        return this
    }

    eat(food) {
        let fn = ()=> {
            console.log(`${this.people}吃了${food}`);
            this.next()
        }

        this.tasks.push(fn)
        return this
    }

    sleepFirst(time) {
        let fn = () => {
            setTimeout(() => {
                console.log(`${this.people}开始等待${time}秒`)
                this.next()
            },time*1000)
        }

        this.tasks.unshift(fn)
        return this
    }
}

Human('蜜瓜').sleep(2).eat('早餐').sleep(1).sleepFirst(1);

