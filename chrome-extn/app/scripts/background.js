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
        console.log('Create bookmark event sent successfully.');
      } else {
        console.error('Error sending create bookmark event:', response.status);
      }
    })
    .catch(error => {
      console.error('Error sending create bookmark event:', error);
    });
});

chrome.bookmarks.onRemoved.addListener((bookmarkId, bookmark) => {
  fetch(`${LOCAL_SERVER_URL}/bookmark/${bookmarkId}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        console.log('Delete bookmark event sent successfully.');
      } else {
        console.error('Error sending delete bookmark event:', response.status);
      }
    })
    .catch(error => {
      console.error('Error sending delete bookmark event:', error);
    });
});

chrome.action.onClicked.addListener(function (tab) {
  chrome.tabs.create({ url: chrome.runtime.getURL('mark-sift-bookmark.html') });
});
console.log('Service worker init successful');
