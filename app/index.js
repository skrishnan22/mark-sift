const express = require('express');

const app = new express();
const bookmarkRouter = require('./modules/bookmark/bookmark.route');
const db = require('./utils/db');
const typesense =  require('./utils/typesense');

(async () => {

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  await db.connect();
  await typesense.getClient();
  app.get('/health', (req, res) => res.json({ ok: true }));
  app.use(`/${bookmarkRouter.mountPath}`, bookmarkRouter.router);
  app.listen(5001, () => console.log('app started'));
  
})();
