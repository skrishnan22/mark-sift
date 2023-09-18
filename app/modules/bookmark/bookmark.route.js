const router = require('express').Router();
const handler = require('./bookmark.handler');
router.get('/', (req, res) => res.json({ count: 1, bookmarks: [] }));
router.post('/', handler.createBookmark);

module.exports = {
  router,
  mountPath: 'bookmark'
};
