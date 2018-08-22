// var a = 1;
// var promise2 = new Promise((resolve, reject) => {
//     if (a) {
//         resolve('success')
//     } else {
//         reject('err')
//     }
// }).then((res) => {
//     return res
// })
// console.log(promise2 instanceof Promise)

function DPromise(fn) {
    let self = this;
    this.status = 'pending';
    this.data = undefined;
    this.onResolvedCallback = [];
    this.onRejectedCallback = [];

    function resolve(value) {
        setTimeout(function () {
            if (self.status === 'pending') {
                self.status = 'resolved';
                self.data = value;
                for (let i = 0; i < self.onResolvedCallback.length; i++) {
                    self.onResolvedCallback[i](value)
                }
            }
        }, 0)
    }

    function reject(err) {
        setTimeout(function () {
            if (self.status === 'pending') {
                self.status = 'rejected';
                self.data = err;
                for (let i = 0; i < self.onRejectedCallback.length; i++) {
                    self.onRejectedCallback[i](err)
                }
            }
        }, 0)
    }

    try {
        fn(resolve, reject)
    } catch (e) {
        reject(e)
    }
}

DPromise.prototype.then = function (onResolved, onRejected) {
    let self = this,
        promise2;

    onResolved = typeof onResolved === 'function' ? onResolved : function (value) {
        return value
    }
    onRejected = typeof onRejected === 'function' ? onRejected : function (err) {
        throw err
    }

    if (self.status === 'resolved') {
        return promise2 = new DPromise(function (resolve, reject) {
            setTimeout(function () {
                try {
                    let x = onResolved(self.data);
                    if (x instanceof DPromise) {
                        x.then(resolve, reject)
                    }else{
                        resolve(x)
                    }
                } catch (e) {
                    reject(e)
                }
            }, 0)
        })
    }

    if (self.status === 'rejected') {
        return promise2 = new DPromise(function (resolve, reject) {
            setTimeout(function () {
                try {
                    let x = onRejected(self.data)
                    if (x instanceof DPromise) {
                        x.then(resolve, reject)
                    }
                } catch (e) {
                    reject(e)
                }
            }, 0)
        })
    }

    if (self.status === 'pending') {
        return promise2 = new DPromise(function (resolve, reject) {
            self.onResolvedCallback.push(function (value) {
                try {
                    let x = onResolved(self.data)
                    if (x instanceof DPromise) {
                        x.then(resolve, reject)
                    }
                } catch (e) {
                    reject(e)
                }
            })

            self.onRejectedCallback.push(function (reason) {
                try {
                    var x = onRejected(self.data)
                    if (x instanceof DPromise) {
                        x.then(resolve, reject)
                    }
                } catch (e) {
                    reject(e)
                }
            })
        })
    }
};

DPromise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected)
}
