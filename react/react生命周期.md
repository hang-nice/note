##### react生命周期

> ```javascript
>  componentDidMount () { } // 初始化渲染挂载时执行 只运行一次 在render之后运行
>     shouldComponentUpdate (prevProps, nextState) { } //react类组件性能优化阻断渲染,默认返回true
>     getSnapshotBeforeUpdate (prevProps, prevState) { }//在render之后更新之前执行，可以获取操作DOM
>     // 更新时运行，getSnapshotBeforeUpdate 的返回值会作为第三个参数给到 componentDidUpdate。
>     //它的执行时机是在 render 方法之后，真实 DOM 更新之前。在这个阶段里，
>     //我们可以同时获取到更新前的真实 DOM 和更新前后的 state&props 信息。
>     componentDidUpdate (preProps, preState, valueFromSnapshot) { }
>
>     componentWillUnmount () { }//执行销毁操作 卸载相关的方法属性
>     getDerivedStateFromProps (props, state) { }
>     //在render之前判断父组件的props用来替换componentWillReceiveProps，使用props来派生/更新state
>     //它是一个静态方法不依赖实例，在这个方法内部访问不到this。
>     // 第一个参数props 来自父组件,state来自自身
>     //必须返回一个对象格式的数据，因为react用这个返回值来更新state，非覆盖式更新而是定向更新
>     constructor() //获取this 初始化state
> ```
