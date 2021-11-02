'use strict';
const pug = require('pug');
//全ての投稿を保存する配列を定義
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
      let body = [];
      req.on('data', (chunk) => {
        body.push(chunk);
      }).on('end', () => {
        body = Buffer.concat(body).toString();
        const params = new URLSearchParams(body);
        const content = params.get('content');
        console.info('投稿されました: ' + content);
        //現在時刻をオブジェクトで取得
        const now = new Date();
        //取得したDateオブジェクトを、設定している言語仕様に変換し、投稿内容と一緒に変数に代入
        const log = `${now.toLocaleString()} の投稿: ${content}`;
        //配列に追加
        contents.push(log);
        //配列の要素を文字列に変換し、要素ごとに改行して表示
        console.info(contents.join('\n'));

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