const bookmarkModel = require('./bookmark.model');
/**
 * Save bookmark document in db
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * returns created db document
 */
async function createBookmark(req, res, next) {
  if (!req.body) {
    throw new Error('No bookmark content received');
  }
  const { url } = req.body;
  const bookmark = {
    url
  };

  const createdBookmark = await bookmarkModel.create(bookmark);
  res.json({
    message: 'Bookmark created',
    data: createdBookmark
  });
}

module.exports.createBookmark = createBookmark;
