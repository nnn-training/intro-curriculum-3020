'use strict';
// require では require を書いたモジュール自身(router.js)を基準として相対パスを指定
// ただし、 fs.readFile() など Node.js でファイル操作をするための関数では、 
// 変わらず作業ディレクトリを基準として相対パスを指定する
const postsHandler = require('./posts-handler');

function route(req, res) {
  switch (req.url) {
    case '/posts':
      postsHandler.handle(req, res);
      break;
    case '/logout':
      // TODO ログアウト処理
      break;
    default:
      break;
  }
}

module.exports = {
  route
};