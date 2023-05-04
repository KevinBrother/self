import { handleMergeRequest } from './service';
import express from 'express';
import bodyParser from 'body-parser';
var app = express();

// 使用 body-parser 中间件解析请求体
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = 8080;

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world');
});

// 每周都得变更一次id?
app.post('/gitlab-merge-request', async function (req, res) {
  await handleMergeRequest(req.body);
  res.send(JSON.stringify({ msg: 'success' }));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
