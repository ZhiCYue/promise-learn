## example2

通过改写 Deferred 来优化异步调用嵌套执行的场景。

#### index.js
存在嵌套调用的示例。

#### index.2.js
通过事件的方式，改写嵌套调用。弊端：代码更糟糕了。

#### index.3.js
支持链式执行的 Promise。

>要让 Promise 支持链式执行，主要通过以下步骤：<br/>
>1. 将所有的回调存放到队列中；<br/>
>2. Promise 完成时，逐个执行回调，一旦检测到返回新的 Promise 对象，停止执行，然后将当前 Deferred 对象的Promise 的引用改为新的 Promise 对象，并将队列中剩余的回调方法转交给新的 Promise 对象。

#### index.4.js
将 API 改写为 Promise。
