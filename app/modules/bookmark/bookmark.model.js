const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true
    },
    title: String,
    excerpt: String,
    searchIndexAttempted: {
      type: Boolean,
      default: false
    },
    searchIndexDone: {
      type: Boolean,
      default: false
    },
    searchIndexFailReason: String,
    browserBookmarkId: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('bookmark', schema);
