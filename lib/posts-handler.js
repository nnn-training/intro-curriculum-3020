'use strict';
const pug = require('pug');
const contents = [];  // 空配列の準備

function handle(req, res) {
  switch (req.method) {
    case 'GET':
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });
      res.end(pug.renderFile('./views/posts.pug'));
      break;
    case 'POST':
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      }).on('end', () => {
        const params = new URLSearchParams(body);
        const content = params.get('content');
        contents.push(content); // 配列 contents に content の入力を追加
        console.info(`送信されました: ${content}`);
        console.info(`送信されました全文: ${contents.join(', ')}`); // .join 配列の中身を指定文字列で結合
        handleRedirectPosts(req, res);
      });
      break;
    default:
      break;
  }
}

function handleRedirectPosts(req, res) {
  res.writeHead(303, {
    'Location': '/posts'
  });
  res.end();
}

module.exports = {
  handle
};