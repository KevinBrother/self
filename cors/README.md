## 跨域解决方案

### 1. [x]通过jsonp跨域  
>
> 只能用于get请求，需要服务端配合改造返回数据
>
### 2. document.domain + iframe跨域
>
> 主域相同，子域不同的两个页面之间跨域
>
### 3. location.hash + iframe
>
> a.html -> b.html -> a.html#hash
>
### 4. window.name + iframe跨域
>
> window.name属性的独特之处：name值在不同的页面（甚至不同域名）加载后依旧存在，并且可以支持非常长的name值（2MB）
>
### 5. postMessage跨域
>
> HTML5新增的API，可以实现跨域通信，IE8+。
>
### 6. 跨域资源共享（CORS）
>
> [x]CORS需要浏览器和后端同时支持。IE 8 和 9 需要通过 XDomainRequest 来实现。
>
### 7. nginx代理跨域
>
> [x]配置nginx，反向代理跨域
>
### 8. nodejs中间件代理跨域
>
> 原理和nginx相同，都是通过启一个代理服务器，实现数据的转发，中间件代理跨域只是更灵活，可以自己控制转发请求的规则。
>
### 9. WebSocket协议跨域
>
> WebSocket protocol是HTML5一种新的协议。它实现了浏览器与服务器全双工通信，同时允许跨域通讯，是server push技术的一种很好的实现。
