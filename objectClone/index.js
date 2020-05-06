const isType = (obj, type) => {
    if (typeof obj !== 'object') return false

    let typeString = Object.prototype.toString(obj)
    switch (type) {
        case 'Array':
            return typeString === '[object Array]';
        case 'Date':
            return typeString === '[object Date]';
        case 'RegExp':
            return typeString === '[object RegExp]';
        default:
            return false
    }
}

const getRegExp = () => {
    let flags = '';

    if (reg.global) flags += 'g';

    if (reg.ignoreCase) flags += 'i';

    if (reg.multiline) flags += 'm'
}

const deepClone = (target, map = new WeakMap()) => {
    if (target === null) return null;

    if (typeof target !== 'object') return target;
    let cloneTarget;
    if (isType(target, 'Array')) {
        cloneTarget = []
    } else if (isType(target, 'Date')) {
        cloneTarget = target.getTime()
    } else if (isType(target, 'RegExp')) {
        cloneTarget = new RegExp(target.source, getRegExp(target));

        if (target.lastIndex) cloneTarget.lastIndex = target.lastIndex;
    } else {
        let proto = Object.getPrototypeOf(target);
        cloneTarget = Object.create(proto)
    }

    if (map.get(target)) {
        return map.get(target)
    }

    map.set(target, cloneTarget)
    for (let key in target) {
        cloneTarget[key] = deepClone(target[key], map)
    }
    return cloneTarget

}

const target = {
    field1: 1,
    field2: undefined,
    field3: {
        cloneTarget: 'cloneTarget'
    },
    field4: [2, 4, 8]
};
target.target = target;

let target2 = deepClone(target)
console.log(target2)