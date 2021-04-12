// 数据类型分为，基础数据与复杂数据类型
// 基础数据类型：存储在栈中.复杂数据类型：在栈中存储一个指向堆的引用地址。
// 数据类型的差别导致在拷贝的时候要根据目标选择对应的拷贝方案(深浅拷贝)
// 浅拷贝：适用与基本数据类型
// Object.assign(target,data) 第一个参数目标对象，第二个参数拷贝对象
// const target = {
//     num: 9999007199254740991,
//     str: 'str',
//     bool: true,
//     n: undefined,
//     a: null,
//     b: 9999007199254740991n, //js新数据类型 解决js Number超出最大整数时数据精度问题。
//     sym: Symbol('foo'),
//     arr: [1, 2, 3],
// }
// Object.defineProperty(target, 'innumerable', {
//     value: '不可枚举属性',
//     enumerable: false
// });
// console.log(target)
// const newData = {
//     old: 'oldData'
// }
// Object.assign(newData, target)
// console.log(newData)

// ...扩展运算符
// const newData = {
//     ...target,
//     old: 'oldData'
// }
// console.log(newData)
// 扩展运算符与Object.assign缺陷：
// 它不会拷贝对象的继承属性；

// 它不会拷贝对象的不可枚举的属性；

// 可以拷贝 Symbol 类型的属性。
// concat、slice 拷贝数组 返回新数组

// 浅拷贝实现                 
const shallowClone = (target) => {
    if (typeof target === 'object' && target !== null) {
        const cloneTarget = Array.isArray(target) ? [] : {};
        for (let prop in target) {
            if (target.hasOwnProperty(prop)) {
                cloneTarget[prop] = target[prop];
            }
        }
        return cloneTarget;
    } else {
        return target;
    }
}

// JSON.stringfy可实现深拷贝但是使用 JSON.stringfy 有一些地方值得注意，主要有这几点：

// 拷贝的对象的值中如果有函数、undefined、symbol 这几种类型，经过 JSON.stringify 序列化之后的字符串中这个键值对会消失；

// 拷贝 Date 引用类型会变成字符串；

// 无法拷贝不可枚举的属性；

// 无法拷贝对象的原型链；

// 拷贝 RegExp 引用类型会变成空对象；

// 对象中含有 NaN、Infinity 以及 -Infinity，JSON 序列化的结果会变成 null；

// 无法拷贝对象的循环应用，即对象成环 (obj[key] = obj)。

// 基础
function deepClone (obj) {
    let cloneObj = {}
    for (let key in obj) {                 //遍历
        if (typeof obj[key] === 'object') {
            cloneObj[key] = deepClone(obj[key])  //是对象就再次调用该函数递归
        } else {
            cloneObj[key] = obj[key]  //基本类型的话直接复制值
        }
    }
    return cloneObj
}
// 这个深拷贝函数并不能复制不可枚举的属性以及 Symbol 类型；

// 这种方法只是针对普通的引用类型的值做递归复制，而对于 Array、Date、RegExp、Error、Function 这样的引用类型并不能正确地拷贝；

// 对象的属性里面成环，即循环引用没有解决。
// 改进
const deepClone = function (obj, hash = new WeakMap()) {
    if (obj.constructor === Date)
        return new Date(obj)       // 日期对象直接返回一个新的日期对象
    if (obj.constructor === RegExp)
        return new RegExp(obj)     //正则对象直接返回一个新的正则对象
    //如果循环引用了就用 weakMap 来解决
    if (hash.has(obj)) return hash.get(obj)
    let allDesc = Object.getOwnPropertyDescriptors(obj)
    //遍历传入参数所有键的特性
    let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)
    //继承原型链
    hash.set(obj, cloneObj)
    for (let key of Reflect.ownKeys(obj)) {
        cloneObj[key] = (isComplexDataType(obj[key]) && typeof obj[key] !== 'function') ? deepClone(obj[key], hash) : obj[key]
    }
    return cloneObj
}