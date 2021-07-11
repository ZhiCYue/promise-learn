## Promise/Deferred 模式

Promise/Deferred 模式是早期的一种异步变成解决方案。

早期代码：
```js
$.get('/api', {
    success: onSuccess,
    error: onError,
    complete: onComplete
})
```
这样编写的异步调用代码，必须在调用时就设置好相应的回调。那么有没有一种方法，先执行异步调用，再延迟传递处理的回调方法呢？
基于这一点出现了 Promise/Deferred 模式。

## 其他相关模型

随着使用 Promise/Deferred 模式的应用逐渐增多，CommonJS 草案逐步抽象出了相应的演变模型：
Promise/A、Promise/B、Promise/D.
