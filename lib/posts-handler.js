'use strict';
const pug = require('pug');
const saveContents = [];

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
      req
        .on('data', (chunk) => {
          body.push(chunk);
        })
        .on('end', () => {
          body = Buffer.concat(body).toString();
          const decoded = decodeURIComponent(body);
          const params = new URLSearchParams(decoded);
          const content = params.get('content');
          console.info('投稿されました: ' + content);
          saveContents.push(content);
          console.info('保存済の投稿: ' + saveContents);
          handleRedirectPosts(req, res);
        });
      break;
    default:
      break;
  }
}

function handleRedirectPosts(req, res) {
  res.writeHead(303, {
    Location: '/posts'
  });
  res.end();
}

module.exports = {
  handle
};
