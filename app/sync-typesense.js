const schedule = require('node-schedule');
const axios = require('axios');
const { Readability } = require('@mozilla/readability');
const { JSDOM } = require('jsdom');
const db = require('./utils/db');
const config = require('config');
const typesense = require('./utils/typesense');

let client;
const typesenseSchema = {
  name: 'bookmarks',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'content', type: 'string' },
    { name: 'sitename', type: 'string' },
    { name: 'url', type: 'string' },
  ]
};
const bookmarkModel = require('./modules/bookmark/bookmark.model');

const job = schedule.scheduleJob('*/10 * * * * *', async function () {
  await db.connect();
  await syncToTypesense();
});
console.log(job);

async function syncToTypesense() {
  
  client = await typesense.getClient();
  await createTypesenseCollection('bookmarks', typesenseSchema);
  const unsyncedBookmarks = await getUnsyncedBookmarks();

  for (const bookmark of unsyncedBookmarks) {
    let searchIndexAttempted = true,
      searchIndexDone = false,
      searchIndexFailReason = '';
    try {
      const { url } = bookmark;
      const urlContent = await extractContentFromURL(url);
      const typesenseDocument = {
        title: urlContent.title,
        content: urlContent.textContent,
        sitename: urlContent?.siteName || '',
        url,
        id: bookmark._id.toString()
      };
      
      await client.collections('bookmarks').documents().upsert(typesenseDocument);
      searchIndexDone = true;
    } catch (err) {
        console.log(err);
        searchIndexFailReason = err.message;
    } finally {
        await bookmarkModel.findOneAndUpdate({_id: bookmark._id}, {$set: {searchIndexDone, searchIndexAttempted,searchIndexFailReason }})
    }
  }
}

async function getUnsyncedBookmarks() {
  return bookmarkModel.find({ searchIndexAttempted: false });
}

async function createTypesenseCollection(collectionName, schema) {
const collections = await client.collections().retrieve();
const collectionExists = collections.find(collection => collection.name === collectionName);
  if (!collectionExists) {
    return client.collections().create(schema);
  }
}

async function extractContentFromURL(url) {
  const response = await axios.get(url);
  const htmlContent = response.data;

  const doc = new JSDOM(htmlContent, {
    url,
    contentType: 'text/html'
  });

  const reader = new Readability(doc.window.document);
  const article = reader.parse();
  return article;
}
