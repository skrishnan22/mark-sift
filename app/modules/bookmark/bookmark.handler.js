const bookmarkModel = require('./bookmark.model');
/**
 * Save bookmark document in db
 * @param {*} req
 * @param {*} res
 * returns created db document
 */
async function createBookmark(req, res) {
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
/**
 * Get paginated list of bookmarks
 * @param {*} req
 * @param {*} res
 */
async function getBookmarks(req, res) {
  const { pageNumber = 1, recordsPerPage = 10 } = req.query;
  const skip = (pageNumber - 1) * recordsPerPage;

  const options = { skip, limit: Number(recordsPerPage), sort: { updatedAt: -1 } };
  const bookmarks = await bookmarkModel.find({}, null, options);

  res.json({
    message: 'Bookmarks fetched',
    data: bookmarks
  })
}

module.exports.createBookmark = createBookmark;
module.exports.getBookmarks = getBookmarks;
