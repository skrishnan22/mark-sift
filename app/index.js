const express = require('express');

const app = new express();
const bookmarkRouter = require('./modules/bookmark/bookmark.route');
const db = require('./db');

(async () => {

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  await db.connect();
  app.get('/health', (req, res) => res.json({ ok: true }));
  app.use(`/${bookmarkRouter.mountPath}`, bookmarkRouter.router);
  app.listen(5001, () => console.log('app started'));
  
})();
