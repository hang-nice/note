###React虚拟dom
1、尽可能的减少浏览器的重绘和重排
2、虚拟dom是对HTML的描述 通过虚拟DOM可以生成多平台通用代码
##组件性能优化
###函数式编程——纯函数
####三大原则：
>* 给定相同的输入，总是返回相同的输出
>* 过程没有副作用(不改变外部状态)
>* 没有额外的状态依赖（不使用共享变量，方法内部状态只在该方法的生命周期内有效）

1、纯函数完全独立于外部状态。可避免共享导致的BUG(class类)
2、纯函数方便进行测试以及重构、提供了良好的拓展性及适应性
###优化PureRender
>* 直接为props设置对象或数组：
每次调用react函数组件都会重新创建组件，此时传入的数组或对象的引用地址会发生改变，无论传入是否改变。
>* 设置props方法并通过事件绑定在元素上。
>* 不需要重新渲染 设置子组件 
###Immutable
在传递数据时使用 Immutable Data(创建之后不可修改数据)进一步提升组件渲染性能。
1、Immutable Data:
>  对Immutable对象进行增删改，都会返回一个新的Immutable对象。Immutable实现原理是持久化的数据结构——使用旧数据创建新数据时 要保证旧数据可用且不变。
Immutable为了避免深拷贝遍历复制节点，使用了结构共享及对象树中一个节点变化只修改此节点及其之下的数据 其他共享。
#####Immutable.js库
重要的3种数据结构：
>* Map:键值对集合。
>* List: 有序可重复的列表 对应于Array。
>* ArraySet: 无序且不可重复的列表。
####Immutable优点（P104）
>* 降低了“可变” 带来的复杂度
>* 节省内存：使用结构共享尽量复用内存，没有被引用的对象会被垃圾回收。
>* 撤销/重做，粘贴/复制。甚至时间旅行功能做起来变得容易。
>* 并发安全。
>* 拥抱函数式编程。
 ####Immutable优点（P105）
容易与原生对象混淆 

###react生命周期
shouldComponentUpdate  一般为性能优化 props和state通过实现浅比较判断是否更新。
###数组方法
slice 数据截取 不改变原数组。splice 改变原数组
性能优化插件 react-addons-perf