## Promise/A 规范

在 API 的定义上，Promise/A 规范比较简单。一个 Promise 对象只要具备 then 方法即可。
要求 then 方法满足一下要求：
1. 接收完成态、错误态的回调方法。
2. 只接收 function 的参数。
3. 返回 Promise 对象，以链式调用。
4. 可选性的支持 progress。

#### index.js
示例代码

#### index.2.js
Q 模块实现

#### index.3.js
多异步协作。在 Deferred 中增加了 all 方法。

#### 其他相关模块
When 和 Q
