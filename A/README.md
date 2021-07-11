## Promise/A 规范

在 API 的定义上，Promise/A 规范比较简单。一个 Promise 对象只要具备 then 方法即可。
要求 then 方法满足一下要求：
1. 接收完成态、错误态的回调方法。
2. 只接收 function 的参数。
3. 返回 Promise 对象，以链式调用。
4. 可选性的支持 progress。
