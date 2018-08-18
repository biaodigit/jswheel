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
        if (self.status === 'pending') {
            self.status = 'resolved';
            self.data = value;
            for (let i = 0; i < self.onResolvedCallback.length; i++) {
                self.onResolvedCallback[i](value)
            }
        }
    }

    function reject(err) {
        if (self.status === 'pending') {
            self.status = 'rejected';
            self.data = err;
            for (let i = 0; i < self.onRejectedCallback.length; i++) {
                self.onRejectedCallback[i](err)
            }
        }
    }

    try {
        fn(resolve, reject)
    } catch (e) {
        reject(e)
    }
}

function resolveDPromise(promise2, x, resolve, reject) {

}

DPromise.prototype.then = function (onResolved, onRejected) {
    let self = this,
        promise2;

    onResolved = typeof onResolved === 'function' ? onResolved : function (value) {
        return value
    }
    onRejected = typeof onRejected === 'function' ? onRejected : function (err) {
        return err
    }

    if (self.status === 'resolved') {
        return promise2 = new DPromise(function (resolve, reject) {
            try {
                let x = onResolved(self.data);
                if (x instanceof DPromise) {
                    x.then(resolve, reject)
                }
                resolve(x)
            } catch (e) {
                reject(e)
            }
        })
    }

    if (self.status === 'rejected') {
        return promise2 = new DPromise(function (resolve, reject) {
            try {
                var x = onRejected(self.data)
                if (x instanceof DPromise) {
                    x.then(resolve, reject)
                }
            } catch (e) {
                reject(e)
            }
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
