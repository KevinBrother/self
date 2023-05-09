const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const query = url.parse(req.url, true).query;

  if (query.callback) {
    // 构造JSONP响应
    const data = { message: 'Hello World' };
    const jsonData = JSON.stringify(data);
    const jsonpCallback = query.callback;
    const jsonpResponse = `abc(${jsonData})`;

    // 设置响应头和响应正文
    // res.setHeader('Content-Type', 'application/javascript');
    res.end(jsonpResponse);
  } else {
    // 处理其他请求
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
