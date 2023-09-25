const router = require('express').Router();
const handler = require('./bookmark.handler');
router.get('/', handler.getBookmarks);
router.post('/', handler.createBookmark);
router.delete('/:browserBookmarkId', handler.deleteBookmark);

module.exports = {
  router,
  mountPath: 'bookmark'
};
