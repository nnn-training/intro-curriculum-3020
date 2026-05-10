'use strict';
const postsHandler = require('./posts-handler');

function route(req, res) {
  switch (req.url) {
    case '/posts':
      postsHandler.handle(req, res);
      break;
    case '/logout':
      // TODO ログアウト処理
      res.writeHead(404, {
        'Content-Type': 'text/plain; charset=utf-8'
      });
      res.end('Not Found');
      break;
    default:
      res.writeHead(404, {
        'Content-Type': 'text/plain; charset=utf-8'
      });
      res.end('Not Found');
      break;
  }
}

module.exports = {
  route
};