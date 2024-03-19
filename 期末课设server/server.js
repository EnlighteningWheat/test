const http = require("http");
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const server = http.createServer();

server.on('request', (req, res) => {
  const url = req.url; // 获取路径部分
  const questionMarkIndex = url.indexOf('?');

  if (questionMarkIndex !== -1) {
    const beforeQuestionMark = url.substring(0, questionMarkIndex);
    const afterQuestionMark = url.substring(questionMarkIndex + 1);

    console.log('问号之前的内容:', beforeQuestionMark);
    console.log('问号之后的内容:', afterQuestionMark);
    const fpath = path.join(__dirname, beforeQuestionMark);
    const n = afterQuestionMark.indexOf('=');
    var token = afterQuestionMark.substring(n + 1);
    fs.readFile(fpath, 'utf8', (err, dataStr) => {
      if (err) {
        console.log("文件打开错误")
        res.end("路径找不到");
      } else {
        const template = ejs.compile(dataStr);
        const renderedContent = template({ token: token })
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        res.end(renderedContent);
      }
    });
  } else {
    console.log('URL 中不包含问号');
    const fpath = path.join(__dirname, url);
    fs.readFile(fpath, 'utf8', (err, dataStr) => {
      if (err) {
        console.log(fpath)
        res.end("路径找不到");
      } else {
        const content = dataStr; // 获取文件内容
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        res.end(content);
      }
    });
  }
});

server.listen(90, function () {
  console.log('server running at http://127.0.0.1:90');
});
