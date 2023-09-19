const router = require('express').Router();
const handler = require('./bookmark.handler');
router.get('/', handler.getBookmarks);
router.post('/', handler.createBookmark);

module.exports = {
  router,
  mountPath: 'bookmark'
};
