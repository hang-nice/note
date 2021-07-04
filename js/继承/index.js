// 继承：可以使新创建的子类 复用已有的父类的属性和方法
// 构造函数继承
// 父类
function Vehicle () {
    this.name = '交通工具'
    this.play = [1, 2]
    this.transport = function () {
        console.log('运输')
    }
}
Vehicle.prototype.n = '工具'
Vehicle.prototype.trans = function () {
    console.log('输送')
}
Vehicle.prototype.name = '工具'

// console.log(v, v.__proto__ === Vehicle.prototype, v.name)
Object.prototype.a = '最上层'


// 子类
function Car () {
    Vehicle.call(this)
    this.name1 = '车',
        this.drive = function () {
            console.log('载人跑')
        }
}
// console.log(Vehicle.prototype)
// Car.prototype = new Vehicle()
const taxi1 = new Car()
const taxi2 = new Car()

// console.log(taxi1, taxi2)
// 借用构造函数 无法继承父类原型上的属性和方法 先查找构造函数内属性方法再去查找原型链上的属性


// 原型继承
function Bus () {
    this.name = '公共汽车'

    this.drive = function () {
        console.log('大量运输')
    }
}

Bus.prototype = new Vehicle()
bus = new Bus()
bus1 = new Bus()
bus.play.push(1)
// console.log(bus.play, bus1.play)
// console.log(bus, bus.name, bus.n, bus.transport)
// 多个实例之间共用同一个原型 继承自原型上的方法属性的修改会作用到其他实例

// 组合继承

function Taxis () {
    Vehicle.call(this)
    this.name2 = '出租车'
}
Taxis.prototype = new Car()
Taxis1 = new Taxis
Taxis2 = new Taxis
Taxis1.play = [1]
// console.log(Taxis1.name2, Taxis2.name2)

function Plane () {
    this.nameP = '飞机'

}
Plane.prototype.fly = function () {
    console.log('飞')
    return this.nameP = '高'
}
Plane.prototype.fly = 1
var p = new Plane()

var p1 = new Plane()
p.fly = 2
// var plane = Object.create(new Plane())
console.log(p.fly, p1.fly)

