const bookmarkModel = require('./bookmark.model');
const typesence = require('../../utils/typesense');
const { default: mongoose } = require('mongoose');
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
  const { bookmarkEvent } = req.body;
  const bookmark = {
    title: bookmarkEvent.title,
    url: bookmarkEvent.url,
    browserBookmarkId: bookmarkEvent.id
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
  const { pageNumber = 1, recordsPerPage = 10, searchText } = req.query;
  if (searchText) {
    const typesenseClient = await typesence.getClient();
    //TODO => Add pagination options
    const searchOptions = {
      q: searchText,
      query_by: ['content', 'title', 'url']
    };
    let bookmarks = [];
    const searchResult = await typesenseClient.collections('bookmarks').documents().search(searchOptions);

    if (searchResult?.hits?.length) {
      const matchHighlights = {};
      const matchingDocIds = searchResult.hits.map(hit => {
        if (hit?.document?.id) {
          if (hit?.highlight) {
            matchHighlights[hit.document.id] = {
              title: hit.highlight?.title?.snippet,
              content: hit.highlight?.content?.snippet
            };
          }
          return new mongoose.Types.ObjectId(hit.document.id);
        }
      });
      if (matchingDocIds.length) {
        bookmarks = await bookmarkModel
          .find({ _id: { $in: matchingDocIds } }, null, { sort: { updatedAt: -1 } })
          .lean();
        bookmarks = bookmarks.map(bookmark => {
          if (matchHighlights[bookmark._id.toString()]) {
            bookmark.hit = matchHighlights[bookmark._id.toString()];
          }
          return bookmark;
        });
      }
    }
    return res.json({
      message: 'Bookmarks fetched',
      data: bookmarks
    });
  } else {
    const skip = (pageNumber - 1) * recordsPerPage;
    const options = { skip, limit: Number(recordsPerPage), sort: { updatedAt: -1 } };
    bookmarks = await bookmarkModel.find({}, null, options);

    res.json({
      message: 'Bookmarks fetched',
      data: bookmarks
    });
  }
}

module.exports.createBookmark = createBookmark;
module.exports.getBookmarks = getBookmarks;
