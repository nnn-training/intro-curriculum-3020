'use strict';
const pug = require('pug');
const contents = [];

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
        const content = params.get('content');// ① フォームから送信された文字を取得（例: "晴天なり"）
        console.info(`送信されました: ${content}`);
        contents.push(content);// ② 配列の末尾にデータ（content）を追加する命令
        console.info(`送信された全内容: ${contents}`);// ③ 配列の中身をすべて表示する
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