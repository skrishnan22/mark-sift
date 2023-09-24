'use strict';
const LOCAL_SERVER_URL = 'http://localhost:5001';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

//chrome.action.setBadgeText({text: '\'Allo'});

chrome.bookmarks.onCreated.addListener((bookmarkId, bookmark) => {
  fetch(`${LOCAL_SERVER_URL}/bookmark`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ bookmarkEvent: bookmark })
  })
    .then(response => {
      if (response.ok) {
        console.log('Bookmark event sent successfully.');
      } else {
        console.error('Error sending bookmark event:', response.status);
      }
    })
    .catch(error => {
      console.error('Error sending bookmark event:', error);
    });
});

chrome.action.onClicked.addListener(function(tab) {
  chrome.tabs.create({url: chrome.runtime.getURL('mark-sift-bookmark.html')});
});
console.log('Service worker init successful');
