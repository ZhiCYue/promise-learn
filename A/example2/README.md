## example2

通过改写 Deferred 来优化异步调用嵌套执行的场景。

#### index.js
存在嵌套调用的示例。

#### index.2.js
通过事件的方式，改写嵌套调用。弊端：代码更糟糕了。

#### index.3.js
支持序列执行的 Promise
