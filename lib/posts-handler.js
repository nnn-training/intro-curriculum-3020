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
      let body = [];
      // 投稿された内容をログに書き出していく
      req.on('data', (chunk) => {
        body.push(chunk);
      }).on('end', () => {
        body = Buffer.concat(body).toString();
        // データを受け取り URI エンコードをデコードする
        const decoded = decodeURIComponent(body);
        // key=value の形で入っている decoded を URISearchParams の形式に変換する
        // https://developer.mozilla.org/ja/docs/Web/API/URLSearchParams
        const params = new URLSearchParams(decoded);
        // フォームで設定した contentというキー名の値を取得
        const content = params.get('content');
        console.info('投稿されました: ' + content);
        contents.push(content);
        console.info('保存されました: ' + contents);
        handleRedirectPosts(req, res);
      });
      break;
    default:
      break;
  }
}
// /posts へのリダイレクトをハンドリングする関数
function handleRedirectPosts(req, res) {
  // 303 は POST でアクセスした際に、その処理の終了後、 
  // GET でも同じパスにアクセスし直してほしい時に利用するステータスコード
  res.writeHead(303, {
    'Location': '/posts'
  });
  res.end();
}

module.exports = {
  handle
};